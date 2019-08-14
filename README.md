# next-weapp-background-audio
> BackgroundAudio for weapp.

## installation
```bash
npm install -S afeiship/next-weapp-background-audio --registry=https://registry.npm.taobao.org
```

## apis
| api   | params | description                     |
| ----- | ------ | ------------------------------- |
| play  | -      | 播放音乐                        |
| pause | -      | 暂停音乐                        |
| stop  | -      | 停止音乐                        |
| move  | -      | 跳转到指定位置(alias for: seek) |
| seek  | -      | 跳转到指定位置                  |
| prop  | -      | set/get 属性                    |

## usage
```js
import NxWeappBackgroundAudio from 'next-weapp-background-audio';

// code goes here:
initAudio() {
  const { model } = this.data;
  this.audioCtx = new NxWeappBackgroundAudio({
    src: model.src,
    title: model.title,
    onChange: this.onAudioChange.bind(this)
  });
}
```

## resources
- https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/BackgroundAudioManager.html
- https://developers.weixin.qq.com/community/develop/doc/0002a48c594b50257bf7def4256801
