import { Module } from '@nestjs/common';

import { ConsumerService } from './kafka.service';
import { CommentConsumer } from './consumers/comment_count.consumer';
import { MusicSharingConsumer } from './consumers/music_sharing.consumer';
import { PlaylistSharingConsumer } from './consumers/playlist_shaing.consumer';

@Module({
  providers: [
    ConsumerService,
    CommentConsumer,
    MusicSharingConsumer,
    PlaylistSharingConsumer,
  ],

  exports: [
    ConsumerService,
    CommentConsumer,
    MusicSharingConsumer,
    PlaylistSharingConsumer,
  ],
})
export class KafkaModule {}
