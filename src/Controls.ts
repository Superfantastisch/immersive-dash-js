import { MediaPlayerClass, MediaPlayer, MediaInfo } from "dashjs";

class VideoTrackNode {
    track: MediaInfo;
    next: any;
    previous: any;
    constructor(track: MediaInfo) {
        this.track = track;
        this.next = null;
        this.previous = null;
    }
}

class VideoTrackList {
    head: any;
    constructor() {
        this.head = null;
    }

    public add(track: MediaInfo) {
        const newVideoTrackNode = new VideoTrackNode(track);

        // special case: no items in the list yet
        if (this.head === null) {
            this.head = newVideoTrackNode;
            newVideoTrackNode.next = newVideoTrackNode;
            newVideoTrackNode.previous = newVideoTrackNode;
        } else {
            const tail = this.head.previous;

            tail.next = newVideoTrackNode;
            newVideoTrackNode.previous = tail;
            newVideoTrackNode.next = this.head;
            this.head.previous = newVideoTrackNode;
        }
    }
}

export class Controls {
    private _player: MediaPlayerClass;
    private currentTrack: any;
    private trackList: Array<MediaInfo> = [];

    constructor(player: MediaPlayerClass) {
        this._player = player;
    }
    private _onStreamInitialized = () => {
        console.log('_onStreamInitialized');
    }
    private _onManifestLoaded = (val: any) => {
        console.log('_onManifestLoaded');
    }
    private _canPlay = (val: any) => {
        console.log('can play');
        console.log(this._player.getCurrentTrackFor('video'));
        console.log(this.currentTrack);
        if (!this.currentTrack)
            this._initializeTrackChange();
    }

    private _trackChangedRendered = (val: any) => {
        console.log('_trackChangedRendered');
        console.log(val);
    }
    private _onTracksAdded = (val: any) => {
        console.log('########## Tracks Added ##########');
        console.log(val);
    }

    public initialize() {
        console.log('onInitControls');
        // TRACK_CHANGE_RENDERED
        // check for player state
        this._player.on(MediaPlayer.events.STREAM_INITIALIZED, this._onStreamInitialized, this);
        this._player.on(MediaPlayer.events.MANIFEST_LOADED, this._onManifestLoaded, this);
        this._player.on(MediaPlayer.events.CAN_PLAY, this._canPlay, this);
        this._player.on(MediaPlayer.events.TRACK_CHANGE_RENDERED, this._trackChangedRendered, this);
        this._player.on(MediaPlayer.events.TEXT_TRACKS_ADDED, this._onTracksAdded, this);
        // check for keydown events
        document.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 13:
                    this._press("enter", event);
                    break;
                case 37:
                    this._press("left", event);
                    break;
                case 39:
                    this._press("right", event);
                    break;
                case 38:
                    this._press("up", event);
                    break;
                case 40:
                    this._press("down", event);
                    break;
            }
        }, false);
    }

    private _press(button: string, event: Event) {
        switch (button) {
            case "down":
                console.log(button);
                break;
            case "enter":
                console.log(button);
                break;
            case "left":
                console.log(button);
                this._changeTrackTo('previous');
                break;
            case "return":
                console.log(button);
                break;
            case "right":
                console.log(button);
                this._changeTrackTo('next');
                break;
            case "up":
                console.log(button);
                break;
        }
    }

    private _initializeTrackChange() {
        
        // this._currentTrack = this._player.getCurrentTrackFor('video');
        console.log('init track change');
        let trackList = this._player.getTracksFor('video');
        console.log(this._player.getTracksFor('video'));
        // filter all static tracks
        const regxStatic = /static/;
        let staticTrackList = trackList.filter(track => regxStatic.test(track.viewpoint));
        console.log(staticTrackList);
        // sort by x value
        const regxXVals = /static-(.*?)-/;
        staticTrackList.sort((a, b) => parseInt(a.viewpoint.match(regxXVals)[1]) - parseInt(b.viewpoint.match(regxXVals)[1]));
        let videoTrackList = new VideoTrackList();
        // filling the list
        staticTrackList.forEach(track => {
            videoTrackList.add(track);
        });
        this.currentTrack = videoTrackList.head;
        console.log(videoTrackList);
        console.log(this.currentTrack);
        // enable track switch mode
        this._player.setTrackSwitchModeFor('video', 'alwaysReplace');
        console.log(this._player.getTrackSwitchModeFor('video'));
    }

    private _changeTrackTo(direction: string) {
        const newTrack = direction === 'next' ? this.currentTrack.next : this.currentTrack.previous;
        console.log('new track');
        console.log(newTrack);
        this.currentTrack = newTrack;
        this._player.setCurrentTrack(this.currentTrack.track);
    }
}