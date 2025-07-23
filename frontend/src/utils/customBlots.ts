import ReactQuill from 'react-quill';
const Quill = ReactQuill.Quill;
const Embed = Quill.import('blots/block/embed');

class CustomEmbed extends Embed {
  static create(value:string) {
    let node = super.create();
    node.setAttribute('contenteditable', false);
    node.innerHTML = `${value}`;
    return node;
  }

  static value(node:any) {
    return node.innerHTML;
  }
}

CustomEmbed.blotName = 'embed';
CustomEmbed.tagName = 'div';

Quill.register(CustomEmbed);

class CustomYoutube extends Embed{
  static create(value:string) {
    let node = super.create();
    node.setAttribute('contenteditable', false);

    let src = value;
    if (value.includes('youtu.be')) {
      const videoId = new URL(value).pathname.split('/')[1];
      src = `https://www.youtube.com/embed/${videoId}`;
    } else if (value.includes('youtube.com')) {
      const url = new URL(value);
      const videoId = url.searchParams.get('v');
      src = `https://www.youtube.com/embed/${videoId}`;
    }
    node.innerHTML = `<iframe src="${src}" frameborder="0" allowfullscreen></iframe>`;
    return node;
  }
  static value(node:any) {
    return node.querySelector('iframe').getAttribute('src');
  }
}
CustomYoutube.blotName='youtube';
CustomYoutube.tagName='div';
Quill.register(CustomYoutube)

class CustomSpotify extends Embed{
  static create(value:string) {
    let node = super.create();
    node.setAttribute('contenteditable', false);
    let src = value;
    if (value.includes('spotify.com')) {
      const url = new URL(value);
      const type = url.pathname.split('/')[1];
      const id = url.pathname.split('/')[2];
      src = `https://open.spotify.com/embed/${type}/${id}`;
    } 
    node.innerHTML = `<iframe style="border-radius:12px" src=${src} width="80%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    return node;
  }
  static value(node:any) {
    return node.innerHTML;
  }
}
CustomSpotify.blotName='spotify';
CustomSpotify.tagName='div';
Quill.register(CustomSpotify)