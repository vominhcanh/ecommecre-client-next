'use client';
import parse, { Element, HTMLReactParserOptions } from 'html-react-parser';
import { cn } from '@heroui/react';

const CkEditorParser = ({ htmlString, className }: { htmlString: string; className?: string }) => {
  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (
        domNode instanceof Element &&
        domNode.name === 'figure' &&
        domNode.attribs.class === 'media'
      ) {
        // Find oembed element inside figure
        const oembedNode = domNode.children.find(
          child => child instanceof Element && child.name === 'oembed',
        ) as Element;

        if (oembedNode && oembedNode.attribs.url) {
          const youtubeUrl = oembedNode.attribs.url;

          // Extract video ID from YouTube URL
          const videoIdMatch = youtubeUrl.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
          );
          const videoId = videoIdMatch ? videoIdMatch[1] : null;

          if (videoId) {
            return (
              <div
                className='video-container'
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  maxWidth: '100%',
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title='YouTube video'
                />
              </div>
            );
          }
        }
      }
      return undefined;
    },
  };

  return <div className={cn('ck ck-content', className)}>{parse(htmlString, options)}</div>;
};

export default CkEditorParser;
