import { MediaPlayer, LogLevel, MediaPlayerSettingClass } from 'dashjs';
import { Controls } from './Controls';
import { setSettings } from './settings';

const videoPlayer = <HTMLElement | undefined>document.querySelector('#videoPlayer');

const url = "https://whcwoifjricw5s.data.mediastore.eu-central-1.amazonaws.com/biathlontest6/Manifest.mpd";
let player = MediaPlayer().create();
player.initialize(videoPlayer, url, true);
// set settings
setSettings(player);

// adding controls
let controls = new Controls(player);
controls.initialize();
