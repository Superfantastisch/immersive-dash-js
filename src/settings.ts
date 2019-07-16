import { MediaPlayerClass, MediaPlayerSettingClass } from "dashjs";

export function setSettings(player: MediaPlayerClass) {
    let settings: MediaPlayerSettingClass
    settings = player.getSettings();
    settings.debug.logLevel = 0;
    settings.streaming.fastSwitchEnabled = true;
    settings.streaming.jumpGaps = true;
    player.updateSettings(settings);
    console.log('settings');
    console.log(settings);
}