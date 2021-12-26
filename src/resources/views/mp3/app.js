const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F';

const playlist = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const bg = $('body');
const vol = $('#volume');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isReapeat: false,

    config: JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY')) || {},
    setconfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem('PLAYER_STORAGE_KEY', JSON.stringify(this.config));
    },
    songs: [
        {
            name: 'Apple seed',
            singer: 'Unknow',
            path: './music/Appleseed.mp3',
            image: './thumb/appleseed.jpg',
        },
        {
            name: 'Attack on Titan',
            singer: 'Unknow',
            path: './music/aot.mp3',
            image: './thumb/attack.jpg',
        },
        {
            name: 'Ashes',
            singer: 'Gemie',
            path: './music/a.m4a',
            image: './thumb/ashe.jpg',
        },
        {
            name: 'Đảo không người',
            singer: 'Nhậm Nhiên',
            path: './music/dkn.m4a',
            image: './thumb/daokhongnguoi.jpg',
        },
        {
            name: 'Fukashigi no Karte',
            singer: 'Ashami Seto',
            path: './music/fnk.flac',
            image: './thumb/fukashagi.jpg',
        },
        {
            name: 'Một bước xa xôi',
            singer: 'Nhậm Nhiên',
            path: './music/mbxx.flac',
            image: './thumb/motbuocxaxoi.jpg',
        },
        {
            name: 'Tabun (たぶん)',
            singer: 'YOASOBI',
            path: './music/tabun.m4a',
            image: './thumb/tabun.jpg',
        },
        {
            name: 'Vogel im Kafig',
            singer: 'Gemie',
            path: './music/vgk.mp3',
            image: './thumb/vogelimkafig.jpg',
        },
        {
            name: 'あの夢をなぞって',
            singer: 'YOASOBI',
            path: './music/tracking.mp3',
            image: './thumb/track.jpg',
        },
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${
                    index === this.currentIndex ? 'active' : ''
                }" data-index="${index}">
                <div class="thumb" style="background-image: url('${
                    song.image
                }')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
                </div>
          `;
        });
        playlist.innerHTML = htmls.join('\n');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvents: function () {
        const _this = this;
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        // cd quay
        cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 25500,
            iterations: Infinity,
        });
        cdThumbAnimate.pause();

        // zoom handle
        // document.onscroll = function() {
        //     const scrollTop = window.scrollY || document.documentElement.scrollTop
        //     const newCdWidth =cdWidth - scrollTop
        //     cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
        //     cd.style.opacity = newCdWidth / cdWidth
        // }
        // play handle
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        // when song is playing
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            bg.style.backgroundImage = `url('${_this.currentSong.image}')`;
            cdThumbAnimate.play();
        };
        // when song is pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };
        // playing
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPersent = Math.floor(
                    (audio.currentTime / audio.duration) * 100,
                );
                progress.value = progressPersent;
            }
        };

        vol.onchange = (e) => {
            audio.volume = e.target.value;
        };
        // tua handle
        progress.onchange = function (e) {
            const seekTime = (e.target.value * audio.duration) / 100;
            audio.currentTime = seekTime;
        };
        // next songs
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            _this.render();
            audio.play();
            _this.scrollToActiveSong();
        };
        // previous songs
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            _this.render();
            audio.play();
            _this.scrollToActiveSong();
        };
        // random songs handle
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
            _this.setconfig('isRandom', _this.isRandom);
        };
        // repeat button
        repeatBtn.onclick = function () {
            _this.isReapeat = !_this.isReapeat;
            repeatBtn.classList.toggle('active', _this.isReapeat);

            _this.setconfig('isRepeat', _this.isReapeat);
        };
        // end ?
        audio.onended = function () {
            if (_this.isReapeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };
        // listen click on playlist
        playlist.onclick = function (e) {
            // click song
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                // xu ly click song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                // xu li click option
                if (e.target.closest('.option')) {
                }
            }
        };
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isReapeat = this.config.isRepeat;
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }

        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }

        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    // scrollToActiveSong: function() {
    //     setTimeout(() =>{
    //         $('.song.active').scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'center',
    //         })
    //     }, 300)
    // },

    start: function () {
        this.loadConfig();
        // Định nghĩa thuộc tính
        this.defineProperties();
        // Sử lý sự kiện
        this.handleEvents();
        // tải bài hát đầu
        this.loadCurrentSong();
        // render playlist
        this.render();
        // fix bug kiểu nông dân
        repeatBtn.classList.toggle('active', this.isReapeat);
        randomBtn.classList.toggle('active', this.isRandom);
    },
};

app.start();
