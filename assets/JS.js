/**
 * 1. Render songs              => Done
 * Scroll top                   => Done
 * Play / pause / seek          => Done
 * CD rotate                    => Done
 * Next / prev                  => Done 
 * Random                       => Done
 * Next / Repeat when ended     => Done
 * Active song                  => Done
 * Scroll active song into view
 * Play song when click **/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playButton = $('.btn-toggle-play');
const progress = $('.progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Những kẻ mộng mơ',
            singer: 'Noo Phước Thịnh',
            path: './assets/music/song1.mp4',
            image: './assets/img/song1.png'
        },
        {
            name: '3107 id',
            singer: 'Duong',
            path: './assets/music/song2.mp4',
            image: './assets/img/song2.png'
        },
        {
            name: 'We do not talk anymore',
            singer: 'Charlie Puth',
            path: './assets/music/song3.mp4',
            image: './assets/img/song3.png'
        },
        {
            name: 'Attention',
            singer: 'Charlie Puth',
            path: './assets/music/song4.mp4',
            image: './assets/img/song4.png'
        },
        {
            name: 'Shape of you',
            singer: 'Ed Sheeran',
            path: './assets/music/song5.mp4',
            image: './assets/img/song5.png'
        },
        {
            name: 'Chẳng còn thời gian ấy',
            singer: 'Bem ft. Nguyen',
            path: './assets/music/song6.mp4',
            image: './assets/img/song6.png'
        },
        {
            name: 'Mood',
            singer: '24kGoldn',
            path: './assets/music/song7.mp4',
            image: './assets/img/song7.png'
        }
    ],
    render:function(){
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active': ''}"> 
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function(){ //Lấy ra danh sách nhạc đầu tiên
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvent: function(){
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity // vô hạn
        })
        cdThumbAnimate.pause();

        //Xử lý phóng to / thu nhỏ CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0; // làm ảnh biến mất khi scroll
            cd.style.opacity = newCdWidth / cdWidth; //Làm ảnh mờ dần khi scroll lên
        }

        //Xử lý khi click vào play/pause
        playButton.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }else {
                audio.play();
            }
        }

        //khi bài hát được play
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        //khi bài hát bị pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        //Xử lý khi tua nhạc 
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        //Khi next bài hát mới
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong(); 
            }else{
                _this.nextSongs();
            }
            audio.play();
            _this.render();
        }

        //Khi prev bài hát mới
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong(); 
            }else{
                _this.prevSongs();
            }
            audio.play();
        }

        //Xử lý khi click vào random bài hát
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom); // nếu israndom đúng thì add active, ko đúng thì remove active    
        }   

        //Xử lý khi repeat song khi audio ended
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat); // nếu isRepeat đúng thì add active, ko đúng thì remove active
        }

        //Xử lý next song khi audio ended
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSongs: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSongs: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function(){
        const newIndex = Math.floor(Math.random() * this.songs.length);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function(){
        //Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        //Lắng nghe, xử lý các sự kiện
        this.handleEvent();

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        
        //Render playLists
        this.render();
    }
};

app.start();

