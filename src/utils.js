export const getTransitionKey = (transition) => transition != null ? `${transition.channel_id}_${transition.video_id}_${transition.transition_id}` : null;

export const zeroPad = (num, places) => String(num).padStart(places, '0');
export const getMiddleFrame = (transition) => Math.round((transition?.frame_start + transition?.frame_end) / 2);
export const getFrameId = (transition) => {
    const channelId = zeroPad(transition?.channel_id, 2);
    const videoId = zeroPad(transition?.video_id, 4);
    const frameId = zeroPad(getMiddleFrame(transition), 6);
    return `C${channelId}_V${videoId}/${frameId}`;
}
export const getVideoName = (transition) => {
    const channelId = zeroPad(transition?.channel_id, 2);
    const videoId = zeroPad(transition?.video_id, 4);
    return `C${channelId}_V${videoId}.mp4`;
}