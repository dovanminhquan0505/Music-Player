/**
 * 1. Render songs
 * Scroll top
 * Play / pause / seek
 * CD rotate
 * Next / prev
 * Random
 * Next / Repeat when ended
 * Active song
 * Scroll active song into view
 * Play song when click **/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const songs = [
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
    }
];