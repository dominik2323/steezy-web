export default {
  active: true,
  id: 'century21',
  name: 'Animovaná reklamní kampaň',
  client: 'Century 21',
  tags: ['print', '3D'],
  filterTags: ['video-animations'],
  reference: {
    active: false,
    quote: '',
    img: '',
    name: '',
    position: '',
    client: '',
  },
  hero: {
    posterSrc: 'PosterImage.jpg',
    videoSrc: 'century21_loop.mp4',
  },
  intro: {
    img: 'IntroImage.jpg',
    videoVimeoId: '',
  },
  introText: {
    about:
      'Homestaging neboli úprava nemovitostí hraje při prodeji nemovitosti jednu z klíčových rolí. Pro společnost Century 21 jsme ve spolupráci s mediální agenturou Tvision připravili tento animovaný spot.\n\nO kreativu k tomuto spotu se postaral známý český stand-up komik Pavel Tomeš a náš tým pak ilustrovanému domku vdechl život. Příběh osamělého domku tak mohl divákům na sociálních sítích zábavnou formou přiblížit podstatu homestagingu.',
    tags: [
      { header: 'role', content: '#animace' },
      { header: 'realizace', content: '2016' },
      { header: 'lokalita', content: 'Česká Republika' },
      { header: 'agentura', content: 'Tvision' },
    ],
  },
  presentation: {
    0: [
      {
        videoVimeoId: '366974988',
      },
    ],
    1: [
      {
        blockquote:
          'Spot je krásným příkladem toho, že základním stavebním kamenem každého dobrého spotu je silný prvotní koncept.',
      },
    ],
    2: [
      {
        img: 'century2100.jpg',
        alt: 'dummy',
      },
      {
        img: 'century2101.jpg',
        alt: 'dummy',
      },
    ],
    3: [
      {
        img: 'century2102.jpg',
        alt: 'dummy',
      },
      {
        img: 'century2103.jpg',
        alt: 'dummy',
      },
    ],
    // 4: [
    //   {
    //     img: "century2104.jpg",
    //     alt: "dummy"
    //   }
    // ]
  },
};
