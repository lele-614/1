(() => {
  'use strict';

  /* =========================================================
     星愿小镇 · 可配置内容
     ========================================================= */
  const CONFIG = {
    herName: '羊羊不奇怪',
    yourName: '爱你的我',
    gifts: [
      {
        id: 'shoes',
        order: 1,
        icon: '👟',
        area: '追风小径',
        gameTitle: '追风小径',
        gameSub: '穿上新鞋，踩准风的方向',
        intro: '跑道尽头传来风的声音。穿上这双鞋，跟着箭头踩准六步，别被风吹乱节奏。',
        map: { x: 8, y: 9 },
        title: 'PUMA 黑金复古运动鞋',
        kicker: '第一份礼物 · 陪你去更远的地方',
        description: '想和你走更远的路。以后散步、旅行、赶最后一班地铁，都穿它。',
        note: '路上慢一点也没关系，反正我会等你。',
        photo: 'assets/shoes.jpg',
        photoPos: '50% 52%',
        hint: '追风小径在广场西边，沿着石板路走到跑道尽头。'
      },
      {
        id: 'spa',
        order: 2,
        icon: '🛁',
        area: '暖汤小屋',
        gameTitle: '暖汤小屋',
        gameSub: '把水温调到刚刚好的 38°C',
        intro: '先把水温调到 38°C，再按一按脚底的穴位。慢一点，今天不用赶时间。',
        map: { x: 36, y: 9 },
        title: '美的智能足浴器',
        kicker: '第二份礼物 · 把疲惫泡掉',
        description: '你总说脚冷。以后每天回家，先把一天的疲惫泡掉，再慢慢跟我说话。',
        note: '水温我替你试过了，刚刚好。',
        photo: 'assets/footbath-display2.jpg',
        photoPos: '50% 50%',
        hint: '暖汤小屋在广场东边，屋顶一直冒着热气。'
      },
      {
        id: 'incense',
        order: 3,
        icon: '🕯️',
        area: '香草花房',
        gameTitle: '五味香谱',
        gameSub: '从五种香气里，调出今晚的味道',
        intro: '桌上留了一页香谱。按前调、中调、后调的顺序，把今晚的味道调出来。',
        map: { x: 8, y: 25 },
        title: '5 味草本线香礼盒',
        kicker: '第三份礼物 · 把房间点成喜欢的味道',
        description: '佛手柑、肉桂龙涎、乌木玫瑰、无花果、薰衣草。想和你一起，把家点成喜欢的味道。',
        note: '以后你闻到这个味道，就会想起今天。',
        photo: 'assets/incense.jpg',
        photoPos: '50% 66%',
        hint: '香草花房在广场西南边，玻璃房里有细细的烟。'
      },
      {
        id: 'vodka',
        order: 4,
        icon: '🍸',
        area: '星夜酒吧',
        gameTitle: '星夜特调',
        gameSub: '倒一杯只属于今晚的酒',
        intro: '吧台已经准备好了。伏特加、橙汁、气泡水，三次倒进杯子里，手要稳。',
        map: { x: 36, y: 25 },
        title: '星夜调酒基酒组合',
        kicker: '第四份礼物 · 留给两个人的夜晚',
        description: 'Fast King 和 Baraka Silver，两瓶适合慢慢调的基酒。等你有空，我们在家调第一杯。',
        note: '第一杯要一起喝，不许偷偷先尝。',
        photo: 'assets/vodka-display3.jpg',
        photoPos: '50% 50%',
        hint: '星夜酒吧在广场东南边，门口挂着会眨眼的小灯。'
      }
    ],
    letter: {
      paragraphs: [
        '见字如面。今天是你生日。我想了很久要送你什么，最后决定把四份礼物藏进一座小镇里。',
        '想送你一双鞋，陪你走更远的路；想送你一盆热水，泡掉每天的疲惫；想送你一屋香气，和一柜子可以慢慢喝的酒。',
        '这些东西都不贵重。贵重的是以后那些可以一起用它们的日子。',
        '如果许愿有用，我希望你永远健康、快乐，永远有底气做自己。'
      ],
      closing: '生日快乐，我的女孩。'
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const dom = {
    world: $('#world'),
    startScreen: $('#startScreen'),
    startBtn: $('#startBtn'),
    startName: $('#startName'),
    hud: $('#hud'),
    areaName: $('#areaName'),
    questCount: $('#questCount'),
    questSlots: $('#questSlots'),
    questHint: $('#questHint'),
    soundBtn: $('#soundBtn'),
    bagBtn: $('#bagBtn'),
    bagCount: $('#bagCount'),
    touchControls: $('#touchControls'),
    joystick: $('#joystick'),
    joystickKnob: $('#joystickKnob'),
    actionBtn: $('#actionBtn'),
    actionHint: $('#actionHint'),
    interactPrompt: $('#interactPrompt'),
    interactLabel: $('#interactLabel'),
    toast: $('#toast'),
    dialogue: $('#dialogue'),
    dialogueText: $('#dialogueText'),
    dialogueNext: $('#dialogueNext'),
    giftOverlay: $('#giftOverlay'),
    giftPhoto: $('#giftPhoto'),
    giftKicker: $('#giftKicker'),
    giftTitle: $('#giftTitle'),
    giftDesc: $('#giftDesc'),
    giftNote: $('#giftNote'),
    giftClose: $('#giftClose'),
    bagOverlay: $('#bagOverlay'),
    bagClose: $('#bagClose'),
    bagGrid: $('#bagGrid'),
    minigameOverlay: $('#minigameOverlay'),
    mgExit: $('#mgExit'),
    mgKicker: $('#mgKicker'),
    mgTitle: $('#mgTitle'),
    mgSub: $('#mgSub'),
    mgSuccess: $('#mgSuccess'),
    mgGames: $$('.mg-game'),
    finaleOverlay: $('#finaleOverlay'),
    finaleCakeScene: $('#finaleCakeScene'),
    finaleLetter: $('#finaleLetter'),
    finaleGiftRow: $('#finaleGiftRow'),
    finalePhotos: $('#finalePhotos'),
    letterCopy: $('#letterCopy'),
    letterName: $('#letterName'),
    letterSign: $('#letterSign'),
    cakeBtn: $('#cakeBtn'),
    replayBtn: $('#replayBtn'),
    confettiLayer: $('#confettiLayer')
  };

  const isTouch = matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  if (isTouch) document.body.classList.add('touch');

  /* =========================================================
     声音
     ========================================================= */
  function createSoundEngine() {
    let ctx = null;
    let master = null;
    let musicGain = null;
    let timer = null;
    let step = 0;
    let on = false;

    const melody = [523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25, 659.25, 880.0, 1046.5];
    const chords = [
      [130.81, 164.81, 196.0],
      [146.83, 174.61, 220.0],
      [174.61, 220.0, 261.63],
      [130.81, 196.0, 246.94]
    ];

    function ensure() {
      if (ctx) return true;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      try {
        ctx = new AudioCtx();
      } catch (error) {
        return false;
      }
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      musicGain = ctx.createGain();
      musicGain.gain.value = 0.16;
      musicGain.connect(master);
      return true;
    }

    function setMaster(value, duration = 0.3) {
      if (!ctx) return;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(value, now + duration);
    }

    function note(freq, duration = 0.5, type = 'triangle', volume = 0.035, when = 0, dest = master) {
      if (!ctx || !on) return;
      const start = ctx.currentTime + when;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(start);
      osc.stop(start + duration + 0.05);
    }

    function pad(freqs) {
      if (!ctx || !on) return;
      freqs.forEach((freq, i) => {
        const start = ctx.currentTime + i * 0.02;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.011, start + 1.2);
        gain.gain.linearRampToValueAtTime(0.006, start + 3.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 4.5);
        osc.connect(gain);
        gain.connect(musicGain);
        osc.start(start);
        osc.stop(start + 4.6);
      });
    }

    function tick() {
      if (!on) return;
      if (step % 8 === 0) pad(chords[(step / 8) % chords.length]);
      if (step % 2 === 0 && Math.random() < 0.7) {
        const freq = melody[Math.floor(Math.random() * melody.length)];
        note(freq, 1.9, 'triangle', 0.018, 0, musicGain);
      }
      step += 1;
    }

    function enable() {
      if (!ensure()) return false;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      on = true;
      setMaster(0.7, 0.8);
      if (!timer) {
        step = 0;
        tick();
        timer = window.setInterval(tick, 470);
      }
      return true;
    }

    function disable() {
      on = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      setMaster(0.0001, 0.3);
    }

    function noise(duration = 0.35, volume = 0.03) {
      if (!ctx || !on) return;
      const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      source.buffer = buffer;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      source.start();
    }

    return {
      isOn: () => on,
      enable,
      disable,
      toggle() {
        if (on) {
          disable();
          return false;
        }
        return enable();
      },
      step: () => note(660, 0.22, 'square', 0.018),
      interact: () => {
        note(523.25, 0.18, 'square', 0.025);
        note(783.99, 0.28, 'triangle', 0.02, 0.08);
      },
      soft: () => {
        note(392, 0.3, 'sine', 0.025);
        note(523.25, 0.5, 'triangle', 0.014, 0.08);
      },
      success: () => {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => note(freq, 1.4, 'triangle', 0.026, i * 0.09));
        note(1567.98, 0.9, 'sine', 0.009, 0.42);
      },
      fail: () => {
        note(196, 0.28, 'square', 0.018);
        note(146.83, 0.38, 'triangle', 0.016, 0.08);
      },
      chest: () => {
        note(130.81, 0.5, 'triangle', 0.028);
        [659.25, 783.99, 1046.5].forEach((freq, i) => note(freq, 0.9, 'sine', 0.016, 0.18 + i * 0.09));
      },
      blow: () => noise(0.6, 0.04),
      finale: () => {
        [261.63, 329.63, 392.0, 523.25, 659.25].forEach((freq, i) => note(freq, 3.0, 'triangle', 0.024, i * 0.06));
        [1046.5, 1318.51, 1567.98].forEach((freq, i) => note(freq, 2.0, 'sine', 0.01, 0.35 + i * 0.1));
      }
    };
  }

  const sound = createSoundEngine();

  /* =========================================================
     地图
     ========================================================= */
  const TILE = 16;
  const MAP_W = 44;
  const MAP_H = 32;
  const WORLD_W = MAP_W * TILE;
  const WORLD_H = MAP_H * TILE;
  const T = { GRASS: 0, PATH: 1, PLAZA: 2, WATER: 3 };
  const tiles = Array.from({ length: MAP_H }, () => Array(MAP_W).fill(T.GRASS));
  const solids = [];
  const treeSpots = [
    [2, 2], [5, 1], [10, 1], [14, 1], [18, 1], [26, 1], [30, 1], [34, 1], [39, 1], [42, 2],
    [1, 6], [1, 11], [1, 15], [1, 22], [1, 27], [1, 30],
    [43, 5], [43, 10], [43, 15], [43, 22], [43, 27], [43, 30],
    [3, 30], [7, 31], [12, 30], [17, 31], [26, 30], [30, 31], [35, 30], [39, 30],
    [12, 3], [14, 10], [17, 4], [17, 10], [28, 4], [29, 10], [31, 7],
    [11, 21], [14, 26], [25, 21], [27, 27], [31, 22], [16, 23]
  ];
  const lampSpots = [
    [12, 18], [31, 18], [22, 10], [22, 23], [6, 18], [38, 18], [16, 16], [28, 16]
  ];

  const stationPoints = CONFIG.gifts.map((gift) => ({
    ...gift,
    x: gift.map.x * TILE + TILE / 2,
    y: gift.map.y * TILE + TILE / 2
  }));
  const giftById = Object.fromEntries(stationPoints.map((gift) => [gift.id, gift]));
  const stage = { x: 22 * TILE + TILE / 2, y: 16 * TILE + TILE / 2 };

  function tileAt(x, y) {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return null;
    return tiles[y][x];
  }

  function fillTiles(x1, y1, x2, y2, type) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (x >= 0 && y >= 0 && x < MAP_W && y < MAP_H) tiles[y][x] = type;
      }
    }
  }

  function hash(x, y, salt = 0) {
    let n = (x * 374761393 + y * 668265263 + salt * 69069) >>> 0;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) >>> 0) / 4294967295;
  }

  function buildMap() {
    fillTiles(3, 18, 40, 20, T.PATH);
    fillTiles(21, 11, 23, 29, T.PATH);
    fillTiles(7, 4, 9, 28, T.PATH);
    fillTiles(35, 4, 37, 28, T.PATH);
    fillTiles(17, 12, 27, 18, T.PLAZA);
    fillTiles(6, 8, 10, 10, T.PLAZA);
    fillTiles(34, 8, 38, 10, T.PLAZA);
    fillTiles(6, 24, 10, 26, T.PLAZA);
    fillTiles(34, 24, 38, 26, T.PLAZA);
    fillTiles(13, 5, 16, 8, T.WATER);

    solids.push(
      { x: 37 * TILE, y: 3 * TILE, w: 6 * TILE, h: 4 * TILE, type: 'spa' },
      { x: 2 * TILE, y: 20 * TILE, w: 5 * TILE, h: 4 * TILE, type: 'greenhouse' },
      { x: 37 * TILE, y: 20 * TILE, w: 6 * TILE, h: 4 * TILE, type: 'bar' },
      { x: 21 * TILE, y: 13 * TILE, w: 3 * TILE, h: 2 * TILE, type: 'stage' },
      { x: 13 * TILE, y: 5 * TILE, w: 4 * TILE, h: 4 * TILE, type: 'water' },
      { x: 4 * TILE, y: 4 * TILE, w: 2 * TILE, h: 2 * TILE, type: 'shoe-sign' }
    );

    treeSpots.forEach(([x, y]) => {
      const t = tileAt(x, y);
      if (t === T.PATH || t === T.PLAZA || t === T.WATER) return;
      solids.push({ x: x * TILE + 5, y: y * TILE + 6, w: 7, h: 9, type: 'tree' });
    });
  }

  /* =========================================================
     静态地图绘制
     ========================================================= */
  function drawTerrain(ctx) {
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const t = tileAt(x, y);
        const px = x * TILE;
        const py = y * TILE;
        const n = hash(x, y);
        if (t === T.GRASS) {
          ctx.fillStyle = n > 0.62 ? '#6b9d50' : (n > 0.3 ? '#65964b' : '#70a255');
          ctx.fillRect(px, py, TILE, TILE);
          if (n > 0.82) {
            ctx.fillStyle = '#5b8d43';
            ctx.fillRect(px + 3, py + 7, 1, 3);
            ctx.fillRect(px + 4, py + 6, 1, 2);
            ctx.fillRect(px + 11, py + 11, 1, 3);
          } else if (n > 0.62) {
            ctx.fillStyle = '#7bae5d';
            ctx.fillRect(px + 5, py + 4, 2, 1);
            ctx.fillRect(px + 12, py + 8, 1, 2);
          }
          if (n > 0.9) {
            const colors = ['#f2d06c', '#f2aeb3', '#d7c9ef'];
            ctx.fillStyle = colors[Math.floor(n * 31) % colors.length];
            ctx.fillRect(px + 4, py + 5, 2, 2);
            ctx.fillRect(px + 3, py + 6, 1, 1);
            ctx.fillRect(px + 6, py + 6, 1, 1);
            ctx.fillStyle = '#fff1b0';
            ctx.fillRect(px + 5, py + 5, 1, 1);
          }
        } else if (t === T.PATH) {
          ctx.fillStyle = n > 0.55 ? '#d2ab70' : '#cda268';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.fillStyle = 'rgba(122, 80, 43, .16)';
          ctx.fillRect(px + (n > 0.5 ? 2 : 9), py + 3, 5, 1);
          ctx.fillRect(px + (n > 0.5 ? 7 : 3), py + 11, 6, 1);
          ctx.fillStyle = 'rgba(255, 239, 198, .25)';
          ctx.fillRect(px + 2, py + 7, 2, 1);
          if (n > 0.72) {
            ctx.fillStyle = '#b88b58';
            ctx.fillRect(px + 5, py + 8, 3, 1);
          }
        } else if (t === T.PLAZA) {
          ctx.fillStyle = n > 0.5 ? '#cbbb91' : '#c4b386';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.strokeStyle = 'rgba(115, 93, 60, .18)';
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 0.5, py + 0.5, TILE - 1, TILE - 1);
          ctx.fillStyle = 'rgba(255, 244, 208, .18)';
          ctx.fillRect(px + 2, py + 2, 5, 1);
          if (n > 0.78) {
            ctx.fillStyle = 'rgba(116, 89, 53, .2)';
            ctx.fillRect(px + 10, py + 10, 2, 1);
          }
        } else if (t === T.WATER) {
          ctx.fillStyle = '#4a8d94';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.fillStyle = 'rgba(177, 229, 213, .2)';
          ctx.fillRect(px + 2, py + 4, 9, 1);
          ctx.fillRect(px + 5, py + 10, 7, 1);
        }
      }
    }

    // 路的边缘和石板细节
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let y = 1; y < MAP_H - 1; y++) {
      for (let x = 1; x < MAP_W - 1; x++) {
        const t = tileAt(x, y);
        if (t !== T.PATH && t !== T.PLAZA) continue;
        const px = x * TILE;
        const py = y * TILE;
        dirs.forEach(([dx, dy]) => {
          const nt = tileAt(x + dx, y + dy);
          if (nt === T.GRASS) {
            ctx.fillStyle = 'rgba(75, 70, 38, .26)';
            if (dx === 1) ctx.fillRect(px + TILE - 2, py, 2, TILE);
            if (dx === -1) ctx.fillRect(px, py, 2, TILE);
            if (dy === 1) ctx.fillRect(px, py + TILE - 2, TILE, 2);
            if (dy === -1) ctx.fillRect(px, py, TILE, 2);
          }
        });
      }
    }
  }

  function drawTree(ctx, tileX, tileY, variant) {
    const x = tileX * TILE + 8;
    const y = tileY * TILE + 14;
    ctx.save();
    ctx.fillStyle = 'rgba(23, 42, 27, .22)';
    ctx.beginPath();
    ctx.ellipse(x, y + 2, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4a3020';
    ctx.fillRect(x - 3, y - 4, 6, 16);
    ctx.fillStyle = '#6d492b';
    ctx.fillRect(x - 2, y - 4, 2, 15);
    if (variant === 'pine') {
      ctx.fillStyle = '#254e37';
      ctx.fillRect(x - 12, y - 24, 24, 12);
      ctx.fillRect(x - 9, y - 32, 18, 10);
      ctx.fillRect(x - 5, y - 38, 10, 8);
      ctx.fillStyle = '#356b46';
      ctx.fillRect(x - 9, y - 24, 18, 4);
      ctx.fillRect(x - 5, y - 31, 10, 3);
      ctx.fillStyle = '#4b7e53';
      ctx.fillRect(x - 2, y - 35, 4, 2);
    } else {
      ctx.fillStyle = '#23492f';
      ctx.fillRect(x - 12, y - 22, 24, 14);
      ctx.fillRect(x - 16, y - 16, 32, 10);
      ctx.fillRect(x - 8, y - 30, 16, 10);
      ctx.fillStyle = '#2f5f39';
      ctx.fillRect(x - 9, y - 26, 18, 9);
      ctx.fillRect(x - 13, y - 18, 26, 6);
      ctx.fillStyle = '#437b48';
      ctx.fillRect(x - 6, y - 28, 9, 4);
      ctx.fillRect(x - 10, y - 17, 7, 3);
      ctx.fillStyle = '#5b9459';
      ctx.fillRect(x - 3, y - 29, 3, 2);
      ctx.fillRect(x + 5, y - 21, 3, 2);
    }
    ctx.restore();
  }

  function drawPond(ctx) {
    const x = 13 * TILE;
    const y = 5 * TILE;
    const w = 4 * TILE;
    const h = 4 * TILE;
    ctx.fillStyle = 'rgba(31, 45, 26, .28)';
    ctx.fillRect(x - 3, y + 3, w + 6, h + 4);
    ctx.fillStyle = '#3c7e86';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#5aa5a2';
    ctx.fillRect(x + 2, y + 2, w - 4, h - 8);
    ctx.fillStyle = 'rgba(188, 235, 213, .32)';
    ctx.fillRect(x + 8, y + 9, 24, 2);
    ctx.fillRect(x + 19, y + 25, 20, 1);
    ctx.fillRect(x + 41, y + 42, 12, 2);
    ctx.fillStyle = '#7d9d55';
    ctx.fillRect(x + 20, y + 18, 8, 5);
    ctx.fillRect(x + 44, y + 37, 6, 4);
    ctx.fillStyle = '#d9a7a2';
    ctx.fillRect(x + 24, y + 16, 2, 2);
    ctx.fillRect(x + 45, y + 35, 2, 2);
    // 岸边石头
    for (let i = 0; i < 10; i++) {
      const sx = x + 2 + (i * 37) % (w - 6);
      const sy = y + (i % 2 ? 1 : h - 4);
      ctx.fillStyle = i % 2 ? '#b8a27c' : '#8d8069';
      ctx.fillRect(sx, sy, 5, 3);
    }
    // 芦苇
    ctx.strokeStyle = '#5e7b3e';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const sx = x + 5 + i * 12;
      const sy = y + h - 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 1, sy - 13 - (i % 3) * 4);
      ctx.stroke();
    }
  }

  function drawTrack(ctx) {
    const x = 3 * TILE;
    const y = 4 * TILE;
    const w = 8 * TILE;
    const h = 5 * TILE;
    ctx.fillStyle = 'rgba(64, 42, 29, .2)';
    ctx.fillRect(x + 2, y + 5, w, h);
    ctx.fillStyle = '#a95e4d';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#c77861';
    ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
    ctx.fillStyle = 'rgba(255, 226, 180, .5)';
    ctx.fillRect(x + 3, y + 12, w - 6, 1);
    ctx.fillRect(x + 3, y + h - 13, w - 6, 1);
    ctx.fillStyle = 'rgba(255, 243, 208, .62)';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(x + 18 + i * 22, y + 27, 10, 2);
    }
    // 终点旗
    ctx.fillStyle = '#f2d184';
    ctx.fillRect(x + w - 22, y + 8, 2, 28);
    ctx.fillStyle = '#f7e8bd';
    ctx.fillRect(x + w - 20, y + 8, 12, 8);
    ctx.fillStyle = '#855031';
    ctx.fillRect(x + w - 16, y + 10, 3, 3);
    // 起跑线
    ctx.fillStyle = 'rgba(255, 243, 208, .65)';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(x + 8, y + 20 + i * 5, 2, 3);
      ctx.fillRect(x + 11, y + 20 + i * 5, 2, 3);
    }
  }

  function drawShoeStand(ctx) {
    const x = 4 * TILE;
    const y = 4 * TILE;
    // 木牌
    ctx.fillStyle = 'rgba(44, 30, 18, .22)';
    ctx.fillRect(x + 2, y + 2, 31, 25);
    ctx.fillStyle = '#5d4029';
    ctx.fillRect(x, y, 30, 24);
    ctx.fillStyle = '#e7c997';
    ctx.fillRect(x + 3, y + 3, 24, 18);
    // 小跑鞋
    ctx.fillStyle = '#f8f1dc';
    ctx.fillRect(x + 6, y + 10, 15, 5);
    ctx.fillRect(x + 4, y + 14, 20, 3);
    ctx.fillStyle = '#e9b85f';
    ctx.fillRect(x + 10, y + 12, 4, 1);
    ctx.fillRect(x + 15, y + 13, 4, 1);
    ctx.fillStyle = '#33332d';
    ctx.fillRect(x + 4, y + 17, 20, 1);
    ctx.fillStyle = '#5d4029';
    ctx.fillRect(x + 14, y + 22, 2, 10);
  }

  function drawSpaHouse(ctx) {
    const x = 37 * TILE;
    const y = 3 * TILE;
    const w = 6 * TILE;
    const h = 4 * TILE;
    ctx.fillStyle = 'rgba(22, 38, 28, .25)';
    ctx.fillRect(x + 4, y + 18, w, h - 10);
    // 屋身
    ctx.fillStyle = '#e4d1aa';
    ctx.fillRect(x + 4, y + 23, w - 8, h - 23);
    ctx.fillStyle = '#f3e2ba';
    ctx.fillRect(x + 8, y + 27, w - 16, h - 29);
    // 木梁
    ctx.fillStyle = '#7a5633';
    ctx.fillRect(x + 4, y + 23, 3, h - 23);
    ctx.fillRect(x + w - 7, y + 23, 3, h - 23);
    ctx.fillRect(x + w / 2 - 1, y + 25, 2, h - 25);
    // 屋顶
    ctx.fillStyle = '#254f4b';
    ctx.fillRect(x + 1, y + 13, w - 2, 13);
    ctx.fillRect(x + 8, y + 5, w - 16, 10);
    ctx.fillRect(x + 21, y + 1, w - 42, 6);
    ctx.fillStyle = '#39716a';
    ctx.fillRect(x + 8, y + 5, w - 16, 3);
    ctx.fillRect(x + 22, y + 1, w - 44, 2);
    // 烟囱
    ctx.fillStyle = '#70513a';
    ctx.fillRect(x + w - 23, y - 6, 7, 14);
    ctx.fillStyle = '#967255';
    ctx.fillRect(x + w - 21, y - 6, 3, 13);
    // 门窗
    ctx.fillStyle = '#64442d';
    ctx.fillRect(x + 17, y + 34, 13, 27);
    ctx.fillStyle = '#e9bc67';
    ctx.fillRect(x + 21, y + 38, 5, 8);
    ctx.fillStyle = '#ffdf92';
    ctx.fillRect(x + w - 27, y + 34, 13, 11);
    ctx.fillRect(x + 15, y + 34, 10, 11);
    ctx.fillStyle = '#6c4f33';
    ctx.fillRect(x + w - 21, y + 34, 2, 11);
    ctx.fillRect(x + w - 27, y + 38, 13, 2);
    ctx.fillRect(x + 19, y + 34, 2, 11);
    ctx.fillRect(x + 15, y + 38, 10, 2);
    // 门口招牌
    ctx.fillStyle = '#5a4029';
    ctx.fillRect(x + 11, y + 28, 26, 10);
    ctx.fillStyle = '#f2d694';
    ctx.fillRect(x + 13, y + 30, 22, 6);
    ctx.fillStyle = '#3b7c72';
    ctx.fillRect(x + 17, y + 31, 2, 2);
    ctx.fillRect(x + 22, y + 33, 2, 2);
    ctx.fillRect(x + 27, y + 30, 2, 2);
    // 室外木桶
    const tx = 36 * TILE + 4;
    const ty = 8 * TILE + 4;
    ctx.fillStyle = 'rgba(27, 38, 24, .2)';
    ctx.beginPath();
    ctx.ellipse(tx + 13, ty + 20, 16, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7b5434';
    ctx.fillRect(tx, ty + 5, 27, 15);
    ctx.fillStyle = '#d8c9a2';
    ctx.fillRect(tx + 2, ty + 4, 23, 5);
    ctx.fillStyle = '#4a9990';
    ctx.fillRect(tx + 5, ty + 5, 17, 3);
    ctx.fillStyle = '#a27343';
    ctx.fillRect(tx, ty + 12, 27, 2);
    ctx.fillRect(tx, ty + 17, 27, 2);
  }

  function drawGreenhouse(ctx) {
    const x = 2 * TILE;
    const y = 20 * TILE;
    const w = 5 * TILE;
    const h = 4 * TILE;
    ctx.fillStyle = 'rgba(26, 43, 27, .25)';
    ctx.fillRect(x + 4, y + 20, w, h - 12);
    // 底座
    ctx.fillStyle = '#856544';
    ctx.fillRect(x, y + h - 13, w, 13);
    ctx.fillStyle = '#b28a5c';
    ctx.fillRect(x + 3, y + h - 12, w - 6, 4);
    // 玻璃屋
    ctx.fillStyle = 'rgba(132, 194, 177, .38)';
    ctx.fillRect(x + 4, y + 14, w - 8, h - 24);
    ctx.fillStyle = 'rgba(197, 232, 206, .25)';
    ctx.fillRect(x + 6, y + 16, w - 12, 6);
    // 屋顶
    ctx.fillStyle = '#416d5b';
    ctx.fillRect(x + 1, y + 10, w - 2, 5);
    ctx.fillStyle = '#79a888';
    ctx.fillRect(x + 5, y + 7, w - 10, 4);
    ctx.fillRect(x + 12, y + 4, w - 24, 4);
    // 框架
    ctx.fillStyle = '#53816e';
    ctx.fillRect(x + 4, y + 14, 2, h - 24);
    ctx.fillRect(x + w - 6, y + 14, 2, h - 24);
    ctx.fillRect(x + w / 2 - 1, y + 10, 2, h - 20);
    ctx.fillRect(x + 4, y + 25, w - 8, 1);
    // 植物
    ctx.fillStyle = '#3f7047';
    ctx.fillRect(x + 9, y + 35, 8, 8);
    ctx.fillRect(x + 15, y + 30, 7, 13);
    ctx.fillRect(x + 25, y + 34, 9, 9);
    ctx.fillRect(x + 35, y + 29, 6, 14);
    ctx.fillStyle = '#6d9b58';
    ctx.fillRect(x + 11, y + 33, 4, 4);
    ctx.fillRect(x + 18, y + 27, 3, 6);
    ctx.fillRect(x + 38, y + 27, 3, 5);
    ctx.fillStyle = '#d8a3a8';
    ctx.fillRect(x + 13, y + 31, 2, 2);
    ctx.fillRect(x + 29, y + 32, 2, 2);
    ctx.fillStyle = '#e4c56c';
    ctx.fillRect(x + 40, y + 34, 2, 2);
    // 烟囱
    ctx.fillStyle = '#5e4831';
    ctx.fillRect(x + w - 14, y + 1, 5, 12);
    // 招牌
    ctx.fillStyle = '#543a26';
    ctx.fillRect(x + 13, y + 17, 44, 10);
    ctx.fillStyle = '#f5dfae';
    ctx.fillRect(x + 15, y + 19, 40, 6);
    ctx.fillStyle = '#55855e';
    ctx.fillRect(x + 19, y + 20, 2, 3);
    ctx.fillRect(x + 24, y + 21, 2, 2);
    ctx.fillRect(x + 30, y + 19, 2, 4);
  }

  function drawBar(ctx) {
    const x = 37 * TILE;
    const y = 20 * TILE;
    const w = 6 * TILE;
    const h = 4 * TILE;
    ctx.fillStyle = 'rgba(18, 28, 24, .25)';
    ctx.fillRect(x + 4, y + 20, w, h - 12);
    // 屋身
    ctx.fillStyle = '#3c3040';
    ctx.fillRect(x + 4, y + 19, w - 8, h - 19);
    ctx.fillStyle = '#59414c';
    ctx.fillRect(x + 8, y + 24, w - 16, h - 27);
    // 屋顶
    ctx.fillStyle = '#4a2e43';
    ctx.fillRect(x, y + 10, w, 12);
    ctx.fillRect(x + 7, y + 4, w - 14, 8);
    ctx.fillRect(x + 19, y, w - 38, 5);
    ctx.fillStyle = '#7b4a5c';
    ctx.fillRect(x + 7, y + 4, w - 14, 2);
    // 门窗
    ctx.fillStyle = '#251d27';
    ctx.fillRect(x + 17, y + 35, 13, 27);
    ctx.fillStyle = '#f3c56f';
    ctx.fillRect(x + 21, y + 39, 5, 7);
    ctx.fillStyle = '#ffdda0';
    ctx.fillRect(x + w - 27, y + 35, 10, 9);
    // 吧台
    ctx.fillStyle = '#7f5938';
    ctx.fillRect(x + 30, y + 38, 50, 13);
    ctx.fillStyle = '#a9784a';
    ctx.fillRect(x + 30, y + 37, 50, 5);
    ctx.fillStyle = '#e0c18b';
    ctx.fillRect(x + 33, y + 34, 3, 7);
    ctx.fillStyle = '#77a47c';
    ctx.fillRect(x + 38, y + 33, 3, 8);
    ctx.fillStyle = '#cf8b68';
    ctx.fillRect(x + 43, y + 35, 3, 6);
    // 招牌
    ctx.fillStyle = '#2f2435';
    ctx.fillRect(x + 10, y + 18, 35, 13);
    ctx.fillStyle = '#f5dc9e';
    ctx.fillRect(x + 13, y + 20, 29, 9);
    // 酒杯图标
    ctx.fillStyle = '#b66d71';
    ctx.beginPath();
    ctx.moveTo(x + 24, y + 22);
    ctx.lineTo(x + 32, y + 22);
    ctx.lineTo(x + 28, y + 26);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#b66d71';
    ctx.fillRect(x + 27, y + 26, 2, 2);
    // 彩灯
    ctx.fillStyle = '#ffe0a0';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(x + 8 + i * 15, y + 27, 2, 2);
    }
    // 木桶
    ctx.fillStyle = '#6d4a2d';
    ctx.fillRect(x + 4, y + 42, 15, 20);
    ctx.fillStyle = '#967044';
    ctx.fillRect(x + 4, y + 45, 15, 2);
    ctx.fillRect(x + 4, y + 55, 15, 2);
  }

  function drawStage(ctx) {
    const cx = 22 * TILE + 8;
    const baseY = 13 * TILE + 8;
    // 舞台圆形石底
    ctx.fillStyle = 'rgba(105, 84, 50, .2)';
    ctx.beginPath();
    ctx.ellipse(cx, baseY + 17, 64, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#bda77b';
    ctx.fillRect(cx - 52, baseY - 6, 104, 28);
    ctx.fillStyle = '#d4c093';
    ctx.fillRect(cx - 47, baseY - 3, 94, 18);
    // 舞台柱
    ctx.fillStyle = '#6d4a2e';
    ctx.fillRect(cx - 52, baseY - 46, 5, 57);
    ctx.fillRect(cx + 47, baseY - 46, 5, 57);
    ctx.fillStyle = '#956d42';
    ctx.fillRect(cx - 51, baseY - 46, 2, 54);
    ctx.fillRect(cx + 48, baseY - 46, 2, 54);
    // 横梁和布幔
    ctx.fillStyle = '#6d4a2e';
    ctx.fillRect(cx - 58, baseY - 51, 116, 6);
    ctx.fillStyle = '#f0c66c';
    ctx.fillRect(cx - 58, baseY - 45, 116, 4);
    ctx.fillStyle = '#d68f8c';
    ctx.beginPath();
    ctx.moveTo(cx - 55, baseY - 41);
    ctx.lineTo(cx - 33, baseY - 41);
    ctx.lineTo(cx - 43, baseY - 27);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#85b7a1';
    ctx.beginPath();
    ctx.moveTo(cx - 12, baseY - 41);
    ctx.lineTo(cx + 12, baseY - 41);
    ctx.lineTo(cx, baseY - 25);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#d6a9d8';
    ctx.beginPath();
    ctx.moveTo(cx + 33, baseY - 41);
    ctx.lineTo(cx + 55, baseY - 41);
    ctx.lineTo(cx + 44, baseY - 27);
    ctx.closePath();
    ctx.fill();
    // 气球
    const balloons = [
      [cx - 65, baseY - 56, '#dc8a8d'],
      [cx + 65, baseY - 58, '#79b7a5'],
      [cx - 58, baseY - 72, '#eccb74'],
      [cx + 58, baseY - 72, '#c7a4d3']
    ];
    balloons.forEach(([bx, by, color]) => {
      ctx.strokeStyle = 'rgba(84, 62, 41, .5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bx, by + 10);
      ctx.lineTo(bx + (bx < cx ? 4 : -4), by + 28);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fillRect(bx - 5, by - 6, 10, 15);
      ctx.fillRect(bx - 3, by - 8, 6, 2);
      ctx.fillStyle = 'rgba(255, 249, 217, .38)';
      ctx.fillRect(bx - 3, by - 4, 2, 5);
    });
    // 桌子
    ctx.fillStyle = '#704a2e';
    ctx.fillRect(cx - 31, baseY + 4, 62, 10);
    ctx.fillStyle = '#e0c18c';
    ctx.fillRect(cx - 31, baseY + 2, 62, 4);
    ctx.fillStyle = '#8a5f38';
    ctx.fillRect(cx - 26, baseY + 12, 4, 17);
    ctx.fillRect(cx + 22, baseY + 12, 4, 17);
    // 小蛋糕
    ctx.fillStyle = '#f4e1bd';
    ctx.fillRect(cx - 11, baseY - 7, 22, 12);
    ctx.fillStyle = '#f1b2b7';
    ctx.fillRect(cx - 10, baseY - 5, 20, 5);
    ctx.fillStyle = '#fff4da';
    ctx.fillRect(cx - 8, baseY - 9, 16, 4);
    ctx.fillStyle = '#e6b760';
    ctx.fillRect(cx - 5, baseY - 9, 2, 4);
    ctx.fillRect(cx + 4, baseY - 9, 2, 4);
  }

  function drawLamp(ctx, tileX, tileY) {
    const x = tileX * TILE + 8;
    const y = tileY * TILE + 14;
    ctx.fillStyle = 'rgba(26, 39, 25, .2)';
    ctx.beginPath();
    ctx.ellipse(x, y + 2, 7, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4b3826';
    ctx.fillRect(x - 1, y - 17, 3, 19);
    ctx.fillStyle = '#6d5337';
    ctx.fillRect(x, y - 17, 1, 19);
    ctx.fillStyle = '#3e2e20';
    ctx.fillRect(x - 7, y - 21, 15, 4);
    ctx.fillStyle = '#ffe3a0';
    ctx.fillRect(x - 4, y - 19, 8, 7);
    ctx.fillStyle = '#fff4c6';
    ctx.fillRect(x - 2, y - 18, 4, 4);
    ctx.fillStyle = '#6d5337';
    ctx.fillRect(x - 6, y - 12, 13, 2);
  }

  function drawFlowerBed(ctx, tileX, tileY, seed, colors) {
    const x = tileX * TILE;
    const y = tileY * TILE;
    for (let i = 0; i < 10; i++) {
      const fx = x + 2 + Math.floor(hash(seed, i, 31) * (TILE - 5));
      const fy = y + 3 + Math.floor(hash(seed, i, 37) * (TILE - 7));
      const color = colors[i % colors.length];
      ctx.fillStyle = '#4f7f42';
      ctx.fillRect(fx, fy + 2, 1, 3);
      ctx.fillStyle = color;
      ctx.fillRect(fx - 1, fy, 3, 2);
      ctx.fillRect(fx, fy - 1, 1, 1);
      ctx.fillStyle = '#fff1b6';
      ctx.fillRect(fx, fy, 1, 1);
    }
  }

  function drawGuideFox(ctx) {
    const x = 24 * TILE + 6;
    const y = 18 * TILE + 10;
    ctx.save();
    ctx.fillStyle = 'rgba(39, 27, 18, .22)';
    ctx.beginPath();
    ctx.ellipse(x, y + 3, 11, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // 尾巴
    ctx.fillStyle = '#d9824c';
    ctx.fillRect(x + 8, y - 7, 8, 8);
    ctx.fillStyle = '#f4c28c';
    ctx.fillRect(x + 14, y - 8, 4, 8);
    // 身体
    ctx.fillStyle = '#e69256';
    ctx.fillRect(x - 8, y - 15, 16, 15);
    ctx.fillStyle = '#f5d2a2';
    ctx.fillRect(x - 4, y - 9, 8, 8);
    // 头
    ctx.fillStyle = '#d9824c';
    ctx.fillRect(x - 9, y - 25, 18, 13);
    ctx.fillRect(x - 6, y - 29, 5, 5);
    ctx.fillRect(x + 2, y - 29, 5, 5);
    ctx.fillStyle = '#f5d2a2';
    ctx.fillRect(x - 6, y - 18, 12, 6);
    ctx.fillStyle = '#38251d';
    ctx.fillRect(x - 5, y - 22, 2, 3);
    ctx.fillRect(x + 3, y - 22, 2, 3);
    ctx.fillRect(x - 1, y - 19, 2, 1);
    ctx.fillStyle = '#df8d86';
    ctx.fillRect(x - 7, y - 18, 2, 1);
    ctx.fillRect(x + 5, y - 18, 2, 1);
    ctx.restore();
  }

  function buildStaticWorld() {
    const canvas = document.createElement('canvas');
    canvas.width = WORLD_W;
    canvas.height = WORLD_H;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    drawTerrain(ctx);
    drawPond(ctx);
    drawTrack(ctx);
    [
      [15, 9, ['#f2d06c', '#eaa6b2', '#f6e4b3']],
      [17, 9, ['#d6b8e8', '#f3d377', '#f4b3b7']],
      [11, 12, ['#f0c267', '#f1b7bf', '#f8e8b8']],
      [30, 12, ['#dbb4e8', '#f3cf72', '#e8aab4']],
      [18, 21, ['#f2b6c2', '#f6db8d', '#c8b4e5']],
      [27, 24, ['#f1c76d', '#eaa6b2', '#e7f0b5']],
      [4, 13, ['#f0c76a', '#e9a8b0', '#f7e2a8']],
      [39, 12, ['#d8b4e5', '#f5d077', '#efb0b7']]
    ].forEach(([x, y, colors]) => {
      if (tileAt(x, y) === T.GRASS) drawFlowerBed(ctx, x, y, x * 17 + y, colors);
    });
    drawShoeStand(ctx);
    drawSpaHouse(ctx);
    drawGreenhouse(ctx);
    drawBar(ctx);
    drawStage(ctx);

    treeSpots.forEach(([x, y], index) => drawTree(ctx, x, y, index % 5 === 0 ? 'pine' : 'round'));
    lampSpots.forEach(([x, y]) => drawLamp(ctx, x, y));
    drawGuideFox(ctx);

    // 散落的花朵和草丛，增加手绘感
    for (let i = 0; i < 90; i++) {
      const x = 3 * TILE + Math.floor(hash(i, 3, 7) * (MAP_W - 6) * TILE);
      const y = 3 * TILE + Math.floor(hash(i, 8, 9) * (MAP_H - 6) * TILE);
      const tx = Math.floor(x / TILE);
      const ty = Math.floor(y / TILE);
      if (tileAt(tx, ty) !== T.GRASS) continue;
      if (solids.some((s) => x > s.x - 4 && x < s.x + s.w + 4 && y > s.y - 4 && y < s.y + s.h + 4)) continue;
      if (i % 3 === 0) {
        ctx.fillStyle = ['#f2d06c', '#dea2b0', '#a7c5e2', '#f6e0a6'][i % 4];
        ctx.fillRect(x, y, 2, 2);
        ctx.fillStyle = '#fff3ba';
        ctx.fillRect(x, y, 1, 1);
      } else {
        ctx.fillStyle = '#4f873f';
        ctx.fillRect(x, y, 1, 3);
        ctx.fillRect(x + 2, y + 1, 1, 2);
      }
    }

    return canvas;
  }

  buildMap();
  const staticWorld = buildStaticWorld();

  /* =========================================================
     状态与画布
     ========================================================= */
  const state = {
    started: false,
    paused: true,
    completed: new Set(),
    player: { x: 22 * TILE + 8, y: 27 * TILE + 8, dir: 'down', moving: false, walkTime: 0 },
    camera: { x: 0, y: 0 },
    active: null,
    overlay: null,
    dialogueOpen: false,
    dialogueQueue: [],
    dialogueIndex: 0,
    dialogueDone: null,
    activeGameId: null,
    minigameWon: false,
    allDialogueShown: false,
    bagOpen: false,
    cakeBlown: false
  };

  const canvas = dom.world;
  const ctx = canvas.getContext('2d');
  let viewW = 320;
  let viewH = 240;
  let pixelScale = 2;
  let lastFrame = performance.now();
  let ambientTime = 0;
  let lastQuestHintAt = 0;
  let lastActiveKey = '';

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    pixelScale = width >= 820 ? 3 : 2;
    viewW = Math.ceil(width / pixelScale);
    viewH = Math.ceil(height / pixelScale);
    canvas.width = viewW;
    canvas.height = viewH;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.imageSmoothingEnabled = false;
    updateCamera(true);
  }

  function updateCamera(snap = false) {
    let targetX = state.player.x - viewW / 2;
    let targetY = state.player.y - viewH / 2;
    if (viewW > WORLD_W) targetX = (WORLD_W - viewW) / 2;
    else targetX = clamp(targetX, 0, WORLD_W - viewW);
    if (viewH > WORLD_H) targetY = (WORLD_H - viewH) / 2;
    else targetY = clamp(targetY, 0, WORLD_H - viewH);
    if (snap) {
      state.camera.x = targetX;
      state.camera.y = targetY;
    } else {
      state.camera.x += (targetX - state.camera.x) * 0.1;
      state.camera.y += (targetY - state.camera.y) * 0.1;
    }
  }

  /* =========================================================
     玩家与碰撞
     ========================================================= */
  const keys = new Set();
  const joystick = { active: false, x: 0, y: 0, pointerId: null };

  function collides(x, y) {
    const left = x - 5;
    const right = x + 5;
    const top = y - 5;
    const bottom = y + 3;
    if (left < 3 * TILE || right > (MAP_W - 3) * TILE || top < 3 * TILE || bottom > (MAP_H - 2) * TILE) return true;
    for (const rect of solids) {
      if (right > rect.x && left < rect.x + rect.w && bottom > rect.y && top < rect.y + rect.h) return true;
    }
    return false;
  }

  function updatePlayer(dt) {
    if (state.paused) {
      state.player.moving = false;
      return;
    }
    let x = 0;
    let y = 0;
    if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) x -= 1;
    if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) x += 1;
    if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) y -= 1;
    if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) y += 1;
    x += joystick.x;
    y += joystick.y;
    const length = Math.hypot(x, y);
    if (length > 0.08) {
      x /= Math.max(1, length);
      y /= Math.max(1, length);
      const speed = 61;
      const nextX = state.player.x + x * speed * dt;
      const nextY = state.player.y + y * speed * dt;
      if (!collides(nextX, state.player.y)) state.player.x = nextX;
      if (!collides(state.player.x, nextY)) state.player.y = nextY;
      state.player.moving = true;
      state.player.walkTime += dt;
      if (Math.abs(x) > Math.abs(y)) state.player.dir = x > 0 ? 'right' : 'left';
      else state.player.dir = y > 0 ? 'down' : 'up';
      if (Math.random() < dt * 4) sound.step();
    } else {
      state.player.moving = false;
    }
    updateCamera(false);
  }

  function drawPlayer(g, sx, sy, dir, moving, time) {
    g.save();
    g.translate(Math.round(sx), Math.round(sy));
    g.fillStyle = 'rgba(28, 39, 26, .28)';
    g.beginPath();
    g.ellipse(0, 0, 7, 3, 0, 0, Math.PI * 2);
    g.fill();

    const frame = moving ? (Math.floor(time * 11) % 2) : 0;
    const bob = moving ? (frame ? 0 : -1) : (Math.sin(time * 2.4) > 0 ? 0 : -1);
    const legOffset = frame ? 1 : -1;

    // 腿
    g.fillStyle = '#49352b';
    g.fillRect(-4, -6 + (legOffset > 0 ? 1 : 0), 3, 6);
    g.fillRect(1, -6 + (legOffset < 0 ? 1 : 0), 3, 6);
    g.fillStyle = '#2d2823';
    g.fillRect(-5, -1 + (legOffset > 0 ? 1 : 0), 5, 2);
    g.fillRect(1, -1 + (legOffset < 0 ? 1 : 0), 5, 2);
    g.fillStyle = '#c39858';
    g.fillRect(-5, -1 + (legOffset > 0 ? 1 : 0), 2, 1);
    g.fillRect(3, -1 + (legOffset < 0 ? 1 : 0), 2, 1);

    // 身体
    g.fillStyle = '#352a25';
    g.fillRect(-6, -17 + bob, 12, 12);
    g.fillStyle = '#f6e9d0';
    g.fillRect(-5, -17 + bob, 10, 5);
    g.fillStyle = '#268f96';
    g.fillRect(-5, -13 + bob, 10, 8);
    g.fillRect(-6, -6 + bob, 12, 2);
    g.fillStyle = '#1b767e';
    g.fillRect(-5, -8 + bob, 10, 3);
    g.fillRect(-6, -6 + bob, 12, 1);
    g.fillStyle = '#4fc0b4';
    g.fillRect(-4, -12 + bob, 8, 1);
    // 背带
    g.fillStyle = '#1d7b82';
    g.fillRect(-4, -17 + bob, 1, 5);
    g.fillRect(3, -17 + bob, 1, 5);
    // 白色蝴蝶结
    g.fillStyle = '#f8fbff';
    g.fillRect(-3, -13 + bob, 2, 2);
    g.fillRect(1, -13 + bob, 2, 2);
    g.fillRect(-1, -12 + bob, 2, 2);
    g.fillStyle = '#c9e5e9';
    g.fillRect(-1, -13 + bob, 2, 1);
    g.fillRect(-2, -11 + bob, 4, 1);
    // 手臂
    g.fillStyle = '#efc5a7';
    g.fillRect(-8, -15 + bob + (frame ? 1 : 0), 2, 7);
    g.fillRect(6, -15 + bob + (frame ? 0 : 1), 2, 7);
    g.fillStyle = '#f6e9d0';
    g.fillRect(-8, -17 + bob, 2, 3);
    g.fillRect(6, -17 + bob, 2, 3);

    // 头部
    const headY = -29 + bob;
    g.fillStyle = '#4b2c1b';
    g.fillRect(-7, headY, 14, 12);
    g.fillRect(-8, headY + 4, 2, 8);
    g.fillRect(6, headY + 4, 2, 8);
    g.fillStyle = '#7d4e2d';
    g.fillRect(-6, headY + 1, 12, 10);
    g.fillRect(-7, headY + 5, 2, 6);
    g.fillRect(5, headY + 5, 2, 6);
    g.fillStyle = '#9a643b';
    g.fillRect(-4, headY + 1, 5, 2);

    if (dir === 'up') {
      g.fillStyle = '#6b4127';
      g.fillRect(-5, headY + 3, 10, 8);
      g.fillStyle = '#8c5a34';
      g.fillRect(-4, headY + 2, 3, 2);
      g.fillStyle = '#f7fbff';
      g.fillRect(-2, headY + 10, 4, 2);
    } else {
      const faceX = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
      g.fillStyle = '#f2c5a6';
      g.fillRect(-5 + faceX, headY + 3, 10, 7);
      g.fillStyle = '#e4ad91';
      g.fillRect(-5 + faceX, headY + 9, 10, 1);
      // 刘海
      g.fillStyle = '#6b4127';
      g.fillRect(-6 + faceX, headY + 1, 12, 3);
      g.fillRect(-6 + faceX, headY + 3, 2, 4);
      g.fillRect(4 + faceX, headY + 3, 2, 4);
      g.fillRect(-4 + faceX, headY + 3, 3, 1);
      g.fillRect(1 + faceX, headY + 3, 4, 1);
      g.fillRect(0 + faceX, headY + 4, 2, 1);
      // 眼镜
      g.fillStyle = '#2d211c';
      if (dir === 'left' || dir === 'right') {
        g.fillRect(-2 + faceX, headY + 5, 4, 4);
        g.fillRect(faceX + 2, headY + 6, 2, 1);
        g.fillStyle = '#f8eed9';
        g.fillRect(-1 + faceX, headY + 6, 2, 2);
        g.fillStyle = '#2a211d';
        g.fillRect(faceX, headY + 6, 1, 2);
        g.fillStyle = '#fff7dd';
        g.fillRect(faceX + 1, headY + 6, 1, 1);
      } else {
        g.fillRect(-5, headY + 5, 4, 4);
        g.fillRect(1, headY + 5, 4, 4);
        g.fillRect(-1, headY + 6, 2, 1);
        g.fillStyle = '#f8eed9';
        g.fillRect(-4, headY + 6, 2, 2);
        g.fillRect(2, headY + 6, 2, 2);
        g.fillStyle = '#2a211d';
        g.fillRect(-4, headY + 6, 1, 2);
        g.fillRect(3, headY + 6, 1, 2);
        g.fillStyle = '#fff7dd';
        g.fillRect(-3, headY + 7, 1, 1);
        g.fillRect(2, headY + 6, 1, 1);
      }
      // 腮红和嘴
      g.fillStyle = 'rgba(231, 140, 137, .55)';
      g.fillRect(-5 + faceX, headY + 8, 2, 1);
      g.fillRect(4 + faceX, headY + 8, 2, 1);
      g.fillStyle = '#a55f58';
      g.fillRect(faceX, headY + 9, 2, 1);
    }

    g.restore();
  }

  /* =========================================================
     动态世界绘制
     ========================================================= */
  const fireflies = Array.from({ length: 24 }, (_, i) => ({
    x: 3 * TILE + hash(i, 2, 11) * (MAP_W - 6) * TILE,
    y: 3 * TILE + hash(i, 9, 13) * (MAP_H - 6) * TILE,
    phase: hash(i, 7, 17) * Math.PI * 2,
    speed: 0.5 + hash(i, 4, 19) * 0.8
  }));

  function screenX(x) { return x - Math.round(state.camera.x); }
  function screenY(y) { return y - Math.round(state.camera.y); }

  function drawGlow(g, x, y, radius, color) {
    const gradient = g.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255, 220, 130, 0)');
    g.fillStyle = gradient;
    g.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  function drawChest(g, gift, open, active) {
    const sx = screenX(gift.x);
    const sy = screenY(gift.y);
    if (sx < -40 || sy < -40 || sx > viewW + 40 || sy > viewH + 40) return;
    g.save();
    g.translate(Math.round(sx), Math.round(sy));
    const bob = Math.sin(ambientTime * 2.2 + gift.order) * 1.5;
    if (active) {
      g.fillStyle = 'rgba(255, 231, 160, .16)';
      g.beginPath();
      g.ellipse(0, 2, 15, 6, 0, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = 'rgba(28, 36, 24, .28)';
    g.beginPath();
    g.ellipse(0, 1, 10, 3, 0, 0, Math.PI * 2);
    g.fill();
    // 宝箱
    g.fillStyle = '#4b2d1c';
    g.fillRect(-8, -9, 16, 11);
    g.fillStyle = '#9b5b34';
    g.fillRect(-6, -7, 12, 8);
    g.fillStyle = '#d7a24e';
    g.fillRect(-9, -9, 18, 2);
    g.fillRect(-2, -7, 4, 8);
    if (open) {
      g.save();
      g.translate(-8, -10);
      g.rotate(-0.55);
      g.fillStyle = '#4b2d1c';
      g.fillRect(0, 0, 17, 4);
      g.fillStyle = '#b66c3d';
      g.fillRect(1, 1, 15, 2);
      g.fillStyle = '#ffdda0';
      g.fillRect(2, 3, 2, 1);
      g.restore();
      g.fillStyle = 'rgba(255, 230, 153, .8)';
      g.fillRect(-5, -7, 10, 4);
      g.fillStyle = '#fff0ac';
      g.fillRect(-1, -8, 2, 2);
    } else {
      g.fillStyle = '#4b2d1c';
      g.fillRect(-9, -11, 18, 3);
      g.fillStyle = '#b66c3d';
      g.fillRect(-8, -10, 16, 2);
      g.fillStyle = '#f7d16e';
      g.fillRect(-2, -8, 4, 3);
      g.fillStyle = '#6b411f';
      g.fillRect(-1, -7, 2, 2);
    }
    // 小星星/状态
    const starY = -24 + bob;
    g.fillStyle = open ? '#ffe7a0' : '#f5cf6c';
    g.fillRect(-1, starY - 4, 2, 8);
    g.fillRect(-4, starY - 1, 8, 2);
    if (active) {
      g.fillStyle = '#fff5c9';
      g.fillRect(-1, starY - 6, 2, 2);
      g.fillRect(-6, starY - 1, 2, 2);
      g.fillRect(4, starY - 1, 2, 2);
    }
    g.restore();
  }

  function drawStageMarker(g) {
    const all = state.completed.size === CONFIG.gifts.length;
    if (!all) return;
    const sx = screenX(stage.x);
    const sy = screenY(stage.y);
    const pulse = 0.5 + Math.sin(ambientTime * 2.7) * 0.2;
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = pulse;
    drawGlow(g, sx, sy - 10, 70, 'rgba(255, 214, 122, .28)');
    g.restore();
    g.fillStyle = 'rgba(255, 238, 167, .22)';
    g.beginPath();
    g.ellipse(sx, sy + 2, 27, 9, 0, 0, Math.PI * 2);
    g.fill();
    // 礼物盒
    g.fillStyle = '#5a3322';
    g.fillRect(sx - 12, sy - 18, 24, 20);
    g.fillStyle = '#b86547';
    g.fillRect(sx - 10, sy - 16, 20, 16);
    g.fillStyle = '#f6d67c';
    g.fillRect(sx - 2, sy - 18, 4, 20);
    g.fillRect(sx - 12, sy - 10, 24, 3);
    g.fillStyle = '#ffe9a4';
    g.fillRect(sx - 1, sy - 17, 2, 2);
  }

  function drawWorld() {
    ctx.clearRect(0, 0, viewW, viewH);
    const camX = Math.round(state.camera.x);
    const camY = Math.round(state.camera.y);
    ctx.drawImage(staticWorld, -camX, -camY);

    // 小溪和灯光的动态微光
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const pondX = screenX(13 * TILE + 30);
    const pondY = screenY(5 * TILE + 40);
    if (pondX > -80 && pondY > -80 && pondX < viewW + 80 && pondY < viewH + 80) {
      ctx.globalAlpha = .2 + Math.sin(ambientTime * 2) * .05;
      drawGlow(ctx, pondX, pondY, 34, 'rgba(109, 204, 190, .2)');
    }
    lampSpots.forEach(([x, y]) => {
      const sx = screenX(x * TILE + 8);
      const sy = screenY(y * TILE + 2);
      if (sx < -30 || sy < -30 || sx > viewW + 30 || sy > viewH + 30) return;
      const flicker = .65 + Math.sin(ambientTime * 3.1 + x) * .12;
      ctx.globalAlpha = flicker * .45;
      drawGlow(ctx, sx, sy, 30, 'rgba(255, 216, 130, .28)');
    });
    ctx.restore();

    // 礼物点
    stationPoints.forEach((gift) => {
      const active = state.active && state.active.id === gift.id;
      drawChest(ctx, gift, state.completed.has(gift.id), active);
    });
    drawStageMarker(ctx);

    // 玩家
    drawPlayer(
      ctx,
      screenX(state.player.x),
      screenY(state.player.y),
      state.player.dir,
      state.player.moving,
      ambientTime
    );

    // 萤火虫
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    fireflies.forEach((fly) => {
      const x = screenX(fly.x + Math.sin(ambientTime * 0.7 + fly.phase) * 13);
      const y = screenY(fly.y + Math.cos(ambientTime * 0.55 + fly.phase) * 8);
      if (x < -10 || y < -10 || x > viewW + 10 || y > viewH + 10) return;
      const alpha = .35 + Math.sin(ambientTime * fly.speed * 2 + fly.phase) * .3;
      ctx.globalAlpha = Math.max(.1, alpha);
      ctx.fillStyle = '#ffe6a2';
      ctx.fillRect(Math.round(x), Math.round(y), 2, 2);
      ctx.globalAlpha = Math.max(.04, alpha * .35);
      drawGlow(ctx, x, y, 9, 'rgba(255, 220, 130, .22)');
    });
    ctx.restore();

    // 温泉蒸汽 / 香草房细烟
    ctx.save();
    for (let i = 0; i < 3; i++) {
      const sx = screenX(36 * TILE + 14 + Math.sin(ambientTime + i) * 4);
      const sy = screenY(8 * TILE + 4 - ((ambientTime * 10 + i * 14) % 26));
      if (sx > -20 && sy > -20 && sx < viewW + 20 && sy < viewH + 20) {
        ctx.fillStyle = 'rgba(220, 245, 230, .12)';
        ctx.beginPath();
        ctx.arc(sx, sy, 4 + i, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    for (let i = 0; i < 3; i++) {
      const sx = screenX(2 * TILE + 50 + Math.sin(ambientTime * .8 + i) * 3);
      const sy = screenY(20 * TILE - 2 - ((ambientTime * 6 + i * 8) % 23));
      if (sx > -20 && sy > -20 && sx < viewW + 20 && sy < viewH + 20) {
        ctx.fillStyle = 'rgba(197, 223, 201, .12)';
        ctx.beginPath();
        ctx.arc(sx, sy, 3 + i, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    if (state.active && !state.paused) {
      const target = state.active.id === 'stage' ? stage : giftById[state.active.id];
      if (target) {
        const sx = screenX(target.x);
        const sy = screenY(target.y);
        ctx.strokeStyle = 'rgba(255, 228, 158, .35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(sx, sy + 1, 13 + Math.sin(ambientTime * 3) * 1.5, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  /* =========================================================
     UI / 任务
     ========================================================= */
  function updateHud() {
    const count = state.completed.size;
    dom.questCount.textContent = `${count} / ${CONFIG.gifts.length}`;
    dom.bagCount.textContent = String(count);
    $$('.quest-slot', dom.questSlots).forEach((slot) => {
      const done = state.completed.has(slot.dataset.id);
      slot.classList.toggle('is-done', done);
      slot.setAttribute('aria-label', done ? `${slot.dataset.area}，礼物已收下` : `查看${slot.dataset.area}的提示`);
    });
    updateQuestHint(true);
  }

  function buildQuestSlots() {
    dom.questSlots.innerHTML = '';
    CONFIG.gifts.forEach((gift) => {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'quest-slot';
      slot.dataset.id = gift.id;
      slot.dataset.area = gift.area;
      slot.title = gift.area;
      slot.textContent = gift.icon;
      slot.addEventListener('click', () => {
        if (!state.started) return;
        if (state.completed.has(gift.id)) {
          showToast(`已经找到：${gift.title}`);
        } else {
          showToast(gift.hint);
        }
      });
      dom.questSlots.appendChild(slot);
    });
  }

  function directionTo(point) {
    const dx = point.x - state.player.x;
    const dy = point.y - state.player.y;
    if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? '东边' : '西边';
    return dy >= 0 ? '南边' : '北边';
  }

  function updateQuestHint(force = false) {
    if (!state.started) return;
    const now = performance.now();
    if (!force && now - lastQuestHintAt < 500) return;
    lastQuestHintAt = now;
    const remaining = stationPoints.filter((gift) => !state.completed.has(gift.id));
    if (!remaining.length) {
      dom.questHint.textContent = '回中央广场 · 开始生日仪式';
      return;
    }
    remaining.sort((a, b) => Math.hypot(a.x - state.player.x, a.y - state.player.y) - Math.hypot(b.x - state.player.x, b.y - state.player.y));
    const next = remaining[0];
    dom.questHint.textContent = `下一站：${next.area} · ${directionTo(next)}`;
  }

  function updateArea() {
    let name = '星愿广场';
    if (state.player.x < 15 * TILE && state.player.y < 16 * TILE) name = '追风小径';
    else if (state.player.x > 29 * TILE && state.player.y < 16 * TILE) name = '暖汤小屋';
    else if (state.player.x < 15 * TILE && state.player.y >= 16 * TILE) name = '香草花房';
    else if (state.player.x > 29 * TILE && state.player.y >= 16 * TILE) name = '星夜酒吧';
    if (dom.areaName.textContent !== name) dom.areaName.textContent = name;
  }

  function updateActive() {
    let next = null;
    const allDone = state.completed.size === CONFIG.gifts.length;
    const stageDist = Math.hypot(stage.x - state.player.x, stage.y - state.player.y);
    if (stageDist < 43) {
      next = {
        id: 'stage',
        type: allDone ? 'stage' : 'stage-locked',
        label: allDone ? '开始生日仪式' : '生日舞台',
        point: stage
      };
    } else {
      let nearest = null;
      let nearestDist = Infinity;
      stationPoints.forEach((gift) => {
        const dist = Math.hypot(gift.x - state.player.x, gift.y - state.player.y);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = gift;
        }
      });
      if (nearest && nearestDist < 35) {
        const done = state.completed.has(nearest.id);
        next = {
          id: nearest.id,
          type: done ? 'done' : 'gift',
          label: done ? `${nearest.area} · 已收下` : `查看 ${nearest.area}`,
          point: nearest
        };
      }
    }
    state.active = next;
    const key = next ? `${next.type}:${next.id}` : '';
    if (key !== lastActiveKey) {
      lastActiveKey = key;
      updateInteractPrompt();
    }
  }

  function updateInteractPrompt() {
    const active = state.active;
    const canShow = Boolean(active) && state.started && !state.paused;
    dom.interactPrompt.hidden = !canShow;
    if (active) dom.interactLabel.textContent = active.label;
    dom.actionBtn.disabled = !active || !state.started;
    dom.actionHint.textContent = active ? active.label : '互动';
    dom.actionHint.classList.toggle('is-visible', Boolean(active) && state.started);
  }

  function showToast(text) {
    dom.toast.textContent = text;
    dom.toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => dom.toast.classList.remove('is-visible'), 2800);
  }

  function setPause() {
    state.paused = !state.started || state.dialogueOpen || Boolean(state.overlay);
    document.body.classList.toggle('dialogue-active', state.dialogueOpen);
    document.body.classList.toggle('overlay-active', Boolean(state.overlay));
    keys.clear();
    resetJoystick();
    updateInteractPrompt();
    if (state.paused) state.player.moving = false;
  }

  /* =========================================================
     对话 / 提示
     ========================================================= */
  function showDialogue(lines, done = null) {
    if (!Array.isArray(lines) || !lines.length) {
      if (done) done();
      return;
    }
    state.dialogueQueue = lines.slice();
    state.dialogueIndex = 0;
    state.dialogueDone = done;
    state.dialogueOpen = true;
    dom.dialogue.hidden = false;
    dom.dialogueText.textContent = state.dialogueQueue[0];
    dom.dialogueNext.innerHTML = state.dialogueQueue.length > 1 ? '继续 <span aria-hidden="true">▶</span>' : '知道啦 <span aria-hidden="true">✦</span>';
    setPause();
    dom.dialogueNext.focus({ preventScroll: true });
  }

  function advanceDialogue() {
    if (!state.dialogueOpen) return;
    if (state.dialogueIndex < state.dialogueQueue.length - 1) {
      state.dialogueIndex += 1;
      dom.dialogueText.textContent = state.dialogueQueue[state.dialogueIndex];
      dom.dialogueNext.innerHTML = state.dialogueIndex < state.dialogueQueue.length - 1 ? '继续 <span aria-hidden="true">▶</span>' : '知道啦 <span aria-hidden="true">✦</span>';
      return;
    }
    const callback = state.dialogueDone;
    state.dialogueOpen = false;
    dom.dialogue.hidden = true;
    state.dialogueDone = null;
    state.dialogueQueue = [];
    state.dialogueIndex = 0;
    setPause();
    if (callback) callback();
  }

  /* =========================================================
     礼物 / 礼物袋 / 结局
     ========================================================= */
  function markGiftCompleted(id) {
    if (state.completed.has(id)) return;
    state.completed.add(id);
    updateHud();
    renderBag();
    lastActiveKey = '';
    updateActive();
    if (state.completed.size === CONFIG.gifts.length) {
      showToast('四份礼物都找到了！回中央广场吧。');
    }
  }

  function showGift(id) {
    const gift = giftById[id];
    if (!gift) return;
    markGiftCompleted(id);
    dom.giftKicker.textContent = `第 ${gift.order} 份礼物 · ${gift.area}`;
    dom.giftTitle.textContent = gift.title;
    dom.giftDesc.textContent = gift.description;
    dom.giftNote.textContent = `“${gift.note}”`;
    dom.giftPhoto.src = gift.photo;
    dom.giftPhoto.alt = gift.title;
    dom.giftPhoto.style.setProperty('--photo-pos', gift.photoPos || '50% 50%');
    dom.giftOverlay.classList.add('is-open');
    dom.giftOverlay.setAttribute('aria-hidden', 'false');
    state.overlay = 'gift';
    setPause();
    sound.chest();
    throwConfetti(28);
    setTimeout(() => dom.giftClose.focus({ preventScroll: true }), 220);
  }

  function closeGift() {
    if (state.overlay !== 'gift') return;
    dom.giftOverlay.classList.remove('is-open');
    dom.giftOverlay.setAttribute('aria-hidden', 'true');
    state.overlay = null;
    setPause();
    const count = state.completed.size;
    if (count === CONFIG.gifts.length && !state.allDialogueShown) {
      state.allDialogueShown = true;
      setTimeout(() => {
        showDialogue([
          '四份礼物都找到了。',
          '最后，回中央广场吧。蛋糕和一句话，都在那里等你。'
        ], () => {
          updateQuestHint(true);
          showToast('中央广场 · 开始生日仪式');
        });
      }, 250);
    } else {
      showToast(`已收进礼物袋 · ${count} / ${CONFIG.gifts.length}`);
    }
  }

  function renderBag() {
    dom.bagGrid.innerHTML = '';
    CONFIG.gifts.forEach((gift) => {
      const found = state.completed.has(gift.id);
      const item = document.createElement('article');
      item.className = 'bag-item' + (found ? ' is-found' : '');
      const thumb = document.createElement('div');
      thumb.className = 'bag-thumb';
      if (found) {
        const img = document.createElement('img');
        img.src = gift.photo;
        img.alt = gift.title;
        img.style.objectPosition = gift.photoPos || '50% 50%';
        thumb.appendChild(img);
      } else {
        thumb.textContent = '?';
      }
      const text = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = found ? gift.title : '还没找到的礼物';
      const sub = document.createElement('p');
      sub.textContent = found ? `${gift.area} · 已收下` : `${gift.area} · 等待发现`;
      text.appendChild(title);
      text.appendChild(sub);
      item.appendChild(thumb);
      item.appendChild(text);
      dom.bagGrid.appendChild(item);
    });
  }

  function openBag() {
    if (state.overlay || state.dialogueOpen) return;
    renderBag();
    dom.bagOverlay.classList.add('is-open');
    dom.bagOverlay.setAttribute('aria-hidden', 'false');
    state.overlay = 'bag';
    setPause();
    sound.interact();
    setTimeout(() => dom.bagClose.focus({ preventScroll: true }), 180);
  }

  function closeBag() {
    if (state.overlay !== 'bag') return;
    dom.bagOverlay.classList.remove('is-open');
    dom.bagOverlay.setAttribute('aria-hidden', 'true');
    state.overlay = null;
    setPause();
  }

  function buildFinale() {
    dom.letterName.textContent = CONFIG.herName;
    dom.letterSign.textContent = CONFIG.yourName;
    dom.finaleGiftRow.innerHTML = '';
    dom.finalePhotos.innerHTML = '';
    CONFIG.gifts.forEach((gift, index) => {
      const chip = document.createElement('span');
      chip.className = 'finale-gift-chip';
      chip.style.setProperty('--tilt', `${(index - 1.5) * 2}deg`);
      const img = document.createElement('img');
      img.src = gift.photo;
      img.alt = gift.title;
      img.style.objectPosition = gift.photoPos || '50% 50%';
      chip.appendChild(img);
      dom.finaleGiftRow.appendChild(chip);

      const photo = document.createElement('span');
      photo.className = 'finale-photo';
      photo.style.setProperty('--tilt', `${(index - 1.5) * 2.5}deg`);
      const photoImg = document.createElement('img');
      photoImg.src = gift.photo;
      photoImg.alt = gift.title;
      photoImg.style.setProperty('--photo-pos', gift.photoPos || '50% 50%');
      photo.appendChild(photoImg);
      dom.finalePhotos.appendChild(photo);
    });

    dom.letterCopy.innerHTML = '';
    CONFIG.letter.paragraphs.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      dom.letterCopy.appendChild(p);
    });
    const closing = document.createElement('p');
    closing.className = 'letter-last';
    closing.textContent = CONFIG.letter.closing;
    dom.letterCopy.appendChild(closing);
  }

  function openFinale() {
    if (state.overlay) return;
    buildFinale();
    dom.finaleCakeScene.hidden = false;
    dom.finaleLetter.hidden = true;
    dom.cakeBtn.classList.remove('is-blown');
    dom.finaleOverlay.classList.add('is-open');
    dom.finaleOverlay.setAttribute('aria-hidden', 'false');
    state.overlay = 'finale';
    state.cakeBlown = false;
    setPause();
    sound.finale();
    setTimeout(() => dom.cakeBtn.focus({ preventScroll: true }), 220);
  }

  function blowCake() {
    if (state.overlay !== 'finale' || state.cakeBlown) return;
    state.cakeBlown = true;
    dom.cakeBtn.classList.add('is-blown');
    sound.blow();
    throwConfetti(54);
    setTimeout(() => {
      dom.finaleCakeScene.hidden = true;
      dom.finaleLetter.hidden = false;
      sound.finale();
      throwConfetti(80);
      dom.replayBtn.focus({ preventScroll: true });
    }, 1100);
  }

  function throwConfetti(count) {
    const colors = ['#f1c66b', '#f0aeb4', '#7bbba5', '#e8d9a9', '#b8a4db', '#d9906c'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty('--c', colors[Math.floor(Math.random() * colors.length)]);
      piece.style.setProperty('--d', `${1.8 + Math.random() * 2.1}s`);
      piece.style.setProperty('--dx', `${Math.random() * 120 - 60}px`);
      piece.style.setProperty('--r', `${Math.random() * 360}deg`);
      piece.style.animationDelay = `${Math.random() * 0.5}s`;
      dom.confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), 4200);
    }
  }

  /* =========================================================
     互动
     ========================================================= */
  function interact() {
    if (!state.started || state.paused) return;
    const active = state.active;
    if (!active) {
      showToast('附近没有可以调查的东西。');
      return;
    }
    if (active.type === 'gift') {
      const gift = giftById[active.id];
      showDialogue([gift.intro], () => openMinigame(active.id));
      return;
    }
    if (active.type === 'done') {
      const gift = giftById[active.id];
      showDialogue([`${gift.area}的礼物已经好好收在袋子里了。`]);
      return;
    }
    if (active.type === 'stage-locked') {
      const left = CONFIG.gifts.length - state.completed.size;
      showToast(`生日舞台还差 ${left} 份礼物。`);
      return;
    }
    if (active.type === 'stage') {
      showDialogue([
        '四份礼物都回来了。',
        '最后一步，闭上眼睛，许一个只属于你的愿望吧。'
      ], openFinale);
    }
  }

  /* =========================================================
     小游戏
     ========================================================= */
  const minigames = {};

  function setMinigameHeader(id) {
    const gift = giftById[id];
    dom.mgKicker.textContent = `第 ${gift.order} 份礼物 · ${gift.area}`;
    dom.mgTitle.textContent = gift.gameTitle;
    dom.mgSub.textContent = gift.gameSub;
    dom.mgGames.forEach((game) => game.classList.toggle('is-active', game.dataset.game === id));
    dom.mgSuccess.hidden = true;
  }

  function openMinigame(id) {
    if (state.overlay || state.dialogueOpen) return;
    const gift = giftById[id];
    if (!gift) return;
    state.activeGameId = id;
    state.minigameWon = false;
    setMinigameHeader(id);
    dom.minigameOverlay.classList.add('is-open');
    dom.minigameOverlay.setAttribute('aria-hidden', 'false');
    state.overlay = 'minigame';
    setPause();
    sound.interact();
    if (minigames[id]) minigames[id].start();
  }

  function exitMinigame() {
    if (state.overlay !== 'minigame' || state.minigameWon) return;
    if (state.activeGameId && minigames[state.activeGameId]) minigames[state.activeGameId].stop();
    state.activeGameId = null;
    dom.minigameOverlay.classList.remove('is-open');
    dom.minigameOverlay.setAttribute('aria-hidden', 'true');
    state.overlay = null;
    setPause();
    showToast('礼物还在这里等你。');
  }

  function winMinigame(id) {
    if (state.minigameWon) return;
    state.minigameWon = true;
    if (minigames[id]) minigames[id].stop();
    dom.mgSuccess.hidden = false;
    sound.success();
    setTimeout(() => {
      dom.mgSuccess.hidden = true;
      dom.minigameOverlay.classList.remove('is-open');
      dom.minigameOverlay.setAttribute('aria-hidden', 'true');
      state.activeGameId = null;
      state.overlay = null;
      setPause();
      showGift(id);
    }, 1350);
  }

  // ---------- 跑鞋：方向反应 ----------
  minigames.shoes = (() => {
    let active = false;
    let running = false;
    let won = false;
    let progress = 0;
    let target = 'up';
    let deadline = 0;
    let raf = 0;
    let timeout = 0;
    let runnerTimer = 0;
    let runnerCtx = null;
    const total = 6;
    const symbols = { up: '↑', down: '↓', left: '←', right: '→' };
    const dirs = ['up', 'down', 'left', 'right'];

    function drawRunner() {
      const canvas = $('#shoeRunnerCanvas');
      if (!canvas) return;
      if (!runnerCtx) {
        runnerCtx = canvas.getContext('2d');
        runnerCtx.imageSmoothingEnabled = false;
      }
      runnerCtx.clearRect(0, 0, canvas.width, canvas.height);
      drawPlayer(runnerCtx, 9, 33, 'right', true, performance.now() / 1000);
    }

    function startRunner() {
      if (runnerTimer) clearInterval(runnerTimer);
      drawRunner();
      runnerTimer = window.setInterval(drawRunner, 120);
    }

    function stopRunner() {
      if (runnerTimer) {
        clearInterval(runnerTimer);
        runnerTimer = 0;
      }
    }

    function buildSteps() {
      const holder = $('#shoeSteps');
      holder.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const step = document.createElement('i');
        step.className = 'track-step';
        holder.appendChild(step);
      }
    }

    function updateSteps() {
      $$('.track-step').forEach((step, index) => {
        step.classList.toggle('is-done', index < progress);
        step.classList.toggle('is-next', index === progress && running);
      });
      $('#shoeProgress').textContent = `${progress} / ${total}`;
      const runner = $('#shoeRunner');
      runner.style.left = `calc(9% + ${(progress / total) * 73}% )`;
    }

    function nextStep() {
      if (!active || won) return;
      target = dirs[Math.floor(Math.random() * dirs.length)];
      $('#shoeArrow').textContent = symbols[target];
      $('#shoeStatus').textContent = '踩！';
      deadline = performance.now() + 1600;
      running = true;
      updateSteps();
      raf = requestAnimationFrame(tick);
    }

    function tick(now) {
      if (!active || !running) return;
      const remaining = clamp((deadline - now) / 1600, 0, 1);
      $('#shoeTimer').style.width = `${remaining * 100}%`;
      if (remaining <= 0) {
        fail();
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function fail() {
      running = false;
      cancelAnimationFrame(raf);
      progress = 0;
      $('#shoeTimer').style.width = '0%';
      $('#shoeArrow').textContent = '×';
      $('#shoeStatus').textContent = '踩错了，重来一次';
      updateSteps();
      sound.fail();
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!active || won) return;
        $('#shoeTimer').style.width = '100%';
        nextStep();
      }, 900);
    }

    function input(dir) {
      if (!active || !running || won || state.minigameWon) return;
      if (dir !== target) {
        fail();
        return;
      }
      running = false;
      cancelAnimationFrame(raf);
      progress += 1;
      sound.step();
      updateSteps();
      $('#shoeTimer').style.width = '100%';
      if (progress >= total) {
        won = true;
        $('#shoeStatus').textContent = '冲线！';
        $('#shoeArrow').textContent = '★';
        setTimeout(() => winMinigame('shoes'), 550);
      } else {
        $('#shoeStatus').textContent = '很稳，继续！';
        clearTimeout(timeout);
        timeout = setTimeout(nextStep, 180);
      }
    }

    function start() {
      active = true;
      won = false;
      running = false;
      progress = 0;
      buildSteps();
      updateSteps();
      $('#shoeTimer').style.width = '100%';
      $('#shoeArrow').textContent = '·';
      $('#shoeStatus').textContent = '准备中…';
      clearTimeout(timeout);
      startRunner();
      timeout = setTimeout(() => {
        if (active) nextStep();
      }, 850);
    }

    function stop() {
      active = false;
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      stopRunner();
    }

    $('#shoeDpad').addEventListener('pointerdown', (event) => {
      const button = event.target.closest('button[data-dir]');
      if (!button) return;
      event.preventDefault();
      input(button.dataset.dir);
    });

    return { start, stop, input, isActive: () => active };
  })();

  // ---------- 足浴：温度 + 按摩 ----------
  minigames.spa = (() => {
    let active = false;
    let raf = 0;
    let last = 0;
    let temp = 24;
    let steady = 0;
    let holding = false;
    let phase = 1;
    let points = 0;
    let won = false;

    function updateUI() {
      const percent = clamp((temp - 20) / 24 * 100, 0, 100);
      $('#spaTemp').textContent = temp.toFixed(1);
      $('#spaTempFill').style.setProperty('--temp', `${percent}%`);
      $('#spaTempKnob').style.setProperty('--temp', `${percent}%`);
      $('#spaHoldBar').style.width = `${clamp(steady / 3, 0, 1) * 100}%`;
      $('#spaPoints').textContent = `${points} / 3`;
      if (phase === 1) {
        if (temp < 36.5) $('#spaStatus').textContent = '再暖一点，38°C 左右最舒服。';
        else if (temp > 39.5) $('#spaStatus').textContent = '有一点烫，等它凉下来。';
        else $('#spaStatus').textContent = '就是这个温度，保持 3 秒。';
      }
    }

    function frame(now) {
      if (!active || won) return;
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (phase === 1) {
        if (holding) temp += 8.6 * dt;
        else temp -= 0.55 * dt;
        temp = clamp(temp, 20, 44);
        if (temp >= 37 && temp <= 39) steady += dt;
        else steady = Math.max(0, steady - dt * 1.4);
        updateUI();
        if (steady >= 3) {
          phase = 2;
          holding = false;
          $('#spaHeat').classList.remove('is-holding');
          $('#spaHeat').hidden = true;
          $('.spa-game[data-game="spa"]').classList.add('phase-massage');
          $('#spaStatus').textContent = '水温刚刚好。按一按脚底吧。';
          sound.soft();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      active = true;
      won = false;
      temp = 24;
      steady = 0;
      holding = false;
      phase = 1;
      points = 0;
      last = 0;
      cancelAnimationFrame(raf);
      const game = $('.spa-game[data-game="spa"]');
      game.classList.remove('phase-massage');
      $$('.spa-point', game).forEach((point) => point.classList.remove('is-tapped'));
      $('#spaHeat').hidden = false;
      $('#spaHeat').disabled = false;
      $('#spaHeat').classList.remove('is-holding');
      $('#spaStatus').textContent = '把水温升到 37–39°C，并保持 3 秒';
      updateUI();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      active = false;
      holding = false;
      cancelAnimationFrame(raf);
      $('#spaHeat').classList.remove('is-holding');
    }

    function pressHeat(value) {
      if (!active || phase !== 1 || won) return;
      holding = value;
      $('#spaHeat').classList.toggle('is-holding', value);
    }

    $('#spaHeat').addEventListener('pointerdown', (event) => {
      event.preventDefault();
      pressHeat(true);
      if ($('#spaHeat').setPointerCapture) {
        try { $('#spaHeat').setPointerCapture(event.pointerId); } catch (error) { /* ignore */ }
      }
    });
    ['pointerup', 'pointercancel'].forEach((type) => {
      $('#spaHeat').addEventListener(type, () => pressHeat(false));
    });

    $$('.spa-point').forEach((point) => {
      point.addEventListener('click', () => {
        if (!active || phase !== 2 || point.classList.contains('is-tapped')) return;
        point.classList.add('is-tapped');
        points += 1;
        sound.step();
        updateUI();
        if (points >= 3) {
          won = true;
          $('#spaStatus').textContent = '按摩完成，整个人都松下来啦。';
          sound.success();
          setTimeout(() => winMinigame('spa'), 700);
        }
      });
    });

    return { start, stop, pressHeat, isActive: () => active };
  })();

  // ---------- 线香：香谱顺序 ----------
  minigames.incense = (() => {
    const scents = [
      { id: 'bergamot', name: '佛手柑', note: '晨光 · 清亮', icon: '🍊', bg: '#f3dfaa', color: '#cf9b36' },
      { id: 'cinnamon', name: '肉桂龙涎', note: '暖木 · 回甘', icon: '🌰', bg: '#e6c4a1', color: '#a56139' },
      { id: 'rose', name: '乌木玫瑰', note: '木香 · 花瓣', icon: '🌹', bg: '#f0c4c0', color: '#b35d69' },
      { id: 'fig', name: '无花果', note: '青绿 · 奶香', icon: '🍃', bg: '#ced9b1', color: '#6e884e' },
      { id: 'lavender', name: '薰衣草', note: '柔软 · 安神', icon: '💜', bg: '#d8c9e5', color: '#8068a5' }
    ];
    const recipe = ['bergamot', 'rose', 'cinnamon'];
    let active = false;
    let stepIndex = 0;
    let won = false;
    let built = false;

    function buildCards() {
      if (built) return;
      built = true;
      const grid = $('#scentGrid');
      scents.forEach((scent) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'scent-card';
        card.dataset.scent = scent.id;
        card.style.setProperty('--scent-bg', scent.bg);
        card.style.setProperty('--scent-color', scent.color);
        card.innerHTML = `<span class="scent-icon" aria-hidden="true">${scent.icon}</span><strong>${scent.name}</strong><small>${scent.note}</small>`;
        card.addEventListener('click', () => choose(scent.id, card));
        grid.appendChild(card);
      });
    }

    function choose(id, card) {
      if (!active || won || card.classList.contains('is-picked')) return;
      if (recipe[stepIndex] === id) {
        card.classList.add('is-picked');
        const slot = $(`.recipe-slot[data-slot="${stepIndex}"]`);
        slot.classList.add('is-filled');
        slot.querySelector('b').textContent = `${scents.find((s) => s.id === id).icon} ${scents.find((s) => s.id === id).name}`;
        stepIndex += 1;
        sound.step();
        if (stepIndex >= 3) {
          won = true;
          $('#incenseStatus').textContent = '香气对上了，就是今晚的味道。';
          sound.success();
          setTimeout(() => winMinigame('incense'), 700);
        } else {
          $('#incenseStatus').textContent = stepIndex === 1 ? '前调落下了，接着找中调。' : '中调也有了，最后是暖暖的后调。';
        }
      } else {
        card.classList.add('is-wrong');
        setTimeout(() => card.classList.remove('is-wrong'), 400);
        $('#incenseStatus').textContent = '这一味不太对，再看看香谱。';
        sound.fail();
      }
    }

    function start() {
      active = true;
      won = false;
      stepIndex = 0;
      buildCards();
      $$('.scent-card').forEach((card) => card.classList.remove('is-picked', 'is-wrong'));
      $$('.recipe-slot').forEach((slot) => {
        slot.classList.remove('is-filled');
        slot.querySelector('b').textContent = '—';
      });
      $('#incenseStatus').textContent = '按香谱的顺序，点选三味香';
    }

    function stop() {
      active = false;
    }

    return { start, stop, isActive: () => active };
  })();

  // ---------- 伏特加：分层 pours ----------
  minigames.vodka = (() => {
    const pours = [
      { id: 'vodka', name: '伏特加', target: 30, min: 25, max: 35, scale: 50, layer: '#layerVodka' },
      { id: 'juice', name: '鲜橙汁', target: 60, min: 52, max: 68, scale: 85, layer: '#layerJuice' },
      { id: 'soda', name: '气泡水', target: 30, min: 25, max: 35, scale: 50, layer: '#layerSoda' }
    ];
    let active = false;
    let stepIndex = 0;
    let amount = 0;
    let pouring = false;
    let raf = 0;
    let last = 0;
    let won = false;
    let accepted = [0, 0, 0];

    function current() { return pours[stepIndex]; }

    function updateMeter() {
      if (stepIndex >= pours.length) return;
      const pour = current();
      const bandLeft = pour.min / pour.scale * 100;
      const bandWidth = (pour.max - pour.min) / pour.scale * 100;
      $('#pourBand').style.left = `${bandLeft}%`;
      $('#pourBand').style.width = `${bandWidth}%`;
      $('#pourFill').style.width = `${clamp(amount / pour.scale * 100, 0, 100)}%`;
      $('#pourKnob').style.left = `${clamp(amount / pour.scale * 100, 0, 100)}%`;
      $('#pourAmount').textContent = `${Math.round(amount)}`;
      $('#cocktailStep').textContent = `${stepIndex + 1} / 3`;
      $('#cocktailIngredient').textContent = pour.name;
      $('#cocktailTarget').textContent = `目标 ${pour.target}ml`;
      $('#pourTip').textContent = '按住倒入，到绿区松手';
    }

    function updateDots() {
      $$('#cocktailDots i').forEach((dot, index) => dot.classList.toggle('is-done', index < stepIndex));
    }

    function updateLayers() {
      const total = 120;
      const maxHeight = 82;
      const heights = accepted.map((ml) => ml / total * maxHeight);
      $('#layerVodka').style.height = `${heights[0]}%`;
      $('#layerVodka').style.bottom = '0%';
      $('#layerJuice').style.height = `${heights[1]}%`;
      $('#layerJuice').style.bottom = `${heights[0]}%`;
      $('#layerSoda').style.height = `${heights[2]}%`;
      $('#layerSoda').style.bottom = `${heights[0] + heights[1]}%`;
    }

    function resetMeter() {
      amount = 0;
      $('#pourFill').style.width = '0%';
      $('#pourKnob').style.left = '0%';
      $('#pourAmount').textContent = '0';
    }

    function frame(now) {
      if (!active || !pouring || won) return;
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      amount += 30 * dt;
      const max = current().scale;
      if (amount >= max) {
        amount = max;
        updateMeter();
        finishPour();
        return;
      }
      updateMeter();
      raf = requestAnimationFrame(frame);
    }

    function startPour() {
      if (!active || stepIndex >= 3 || pouring || won) return;
      pouring = true;
      last = 0;
      $('#pourBtn').classList.add('is-holding');
      raf = requestAnimationFrame(frame);
    }

    function finishPour() {
      if (!active || !pouring || won) return;
      pouring = false;
      cancelAnimationFrame(raf);
      $('#pourBtn').classList.remove('is-holding');
      const pour = current();
      if (amount >= pour.min && amount <= pour.max) {
        accepted[stepIndex] = amount;
        updateLayers();
        updateDots();
        stepIndex += 1;
        sound.step();
        resetMeter();
        if (stepIndex >= pours.length) {
          $('#pourBtn').hidden = true;
          $('#garnishBtn').hidden = false;
          $('#cocktailStatus').textContent = '最后，放上这颗小樱桃。';
          $('#cocktailStep').textContent = '3 / 3';
          $('#cocktailIngredient').textContent = '完成';
          $('#cocktailTarget').textContent = '还差一颗樱桃';
          sound.soft();
        } else {
          $('#cocktailStatus').textContent = `${pour.name}倒好了，下一味。`;
          updateMeter();
        }
      } else {
        $('#cocktailStatus').textContent = amount < pour.min ? '倒少了一点，这一层重来。' : '倒多啦，这一层重来。';
        $('#pourFill').style.width = '0%';
        $('#pourKnob').style.left = '0%';
        sound.fail();
        setTimeout(() => {
          if (!active) return;
          resetMeter();
          updateMeter();
        }, 420);
      }
    }

    function start() {
      active = true;
      won = false;
      stepIndex = 0;
      amount = 0;
      pouring = false;
      accepted = [0, 0, 0];
      last = 0;
      updateLayers();
      $('#pourBtn').hidden = false;
      $('#garnishBtn').hidden = true;
      $('#cocktailStatus').textContent = '先倒 30ml 伏特加';
      updateMeter();
      updateDots();
      const game = $('.cocktail-game[data-game="vodka"]');
      game.classList.remove('is-garnished');
    }

    function stop() {
      active = false;
      pouring = false;
      cancelAnimationFrame(raf);
      $('#pourBtn').classList.remove('is-holding');
    }

    $('#pourBtn').addEventListener('pointerdown', (event) => {
      event.preventDefault();
      startPour();
      if ($('#pourBtn').setPointerCapture) {
        try { $('#pourBtn').setPointerCapture(event.pointerId); } catch (error) { /* ignore */ }
      }
    });
    ['pointerup', 'pointercancel'].forEach((type) => {
      $('#pourBtn').addEventListener(type, () => {
        if (pouring) finishPour();
      });
    });
    $('#garnishBtn').addEventListener('click', () => {
      if (!active || won || stepIndex < 3) return;
      won = true;
      $('.cocktail-game[data-game="vodka"]').classList.add('is-garnished');
      $('#cocktailStatus').textContent = '星愿特调，完成。';
      sound.success();
      setTimeout(() => winMinigame('vodka'), 800);
    });

    return { start, stop, pressPour: startPour, releasePour: finishPour, isActive: () => active };
  })();

  /* =========================================================
     输入 / 控制
     ========================================================= */
  function resetJoystick() {
    joystick.active = false;
    joystick.x = 0;
    joystick.y = 0;
    dom.joystickKnob.style.transform = 'translate(-50%, -50%)';
  }

  function setupJoystick() {
    const updateStick = (event) => {
      const rect = dom.joystick.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = event.clientX - cx;
      let dy = event.clientY - cy;
      const radius = rect.width * .34;
      const len = Math.hypot(dx, dy);
      if (len > radius) {
        dx = dx / len * radius;
        dy = dy / len * radius;
      }
      joystick.x = dx / radius;
      joystick.y = dy / radius;
      dom.joystickKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    };

    dom.joystick.addEventListener('pointerdown', (event) => {
      if (!state.started || state.paused) return;
      event.preventDefault();
      joystick.active = true;
      joystick.pointerId = event.pointerId;
      dom.joystick.setPointerCapture?.(event.pointerId);
      updateStick(event);
    });
    dom.joystick.addEventListener('pointermove', (event) => {
      if (!joystick.active || event.pointerId !== joystick.pointerId) return;
      updateStick(event);
    });
    ['pointerup', 'pointercancel'].forEach((type) => {
      dom.joystick.addEventListener(type, (event) => {
        if (event.pointerId !== joystick.pointerId) return;
        resetJoystick();
        joystick.pointerId = null;
      });
    });
  }

  function onMinigameKey(event) {
    if (state.overlay !== 'minigame' || state.minigameWon) return false;
    const id = state.activeGameId;
    if (!id) return false;
    const key = event.key;
    if (id === 'shoes') {
      const map = { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
      if (map[key]) {
        event.preventDefault();
        minigames.shoes.input(map[key]);
        return true;
      }
    }
    if (id === 'spa') {
      if (key === ' ' || key === 'Spacebar') {
        event.preventDefault();
        if (!event.repeat) minigames.spa.pressHeat(true);
        return true;
      }
    }
    if (id === 'vodka') {
      if (key === ' ' || key === 'Spacebar') {
        event.preventDefault();
        if (!event.repeat) minigames.vodka.pressPour();
        return true;
      }
    }
    return false;
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      if (state.overlay === 'minigame') {
        exitMinigame();
        return;
      }
      if (state.overlay === 'gift') {
        closeGift();
        return;
      }
      if (state.overlay === 'bag') {
        closeBag();
        return;
      }
      if (state.dialogueOpen) {
        advanceDialogue();
        return;
      }
    }

    if (state.dialogueOpen) {
      if (event.key === 'e' || event.key === 'E' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        advanceDialogue();
      }
      return;
    }

    if (state.overlay === 'minigame') {
      onMinigameKey(event);
      return;
    }

    if (state.overlay) return;

    if (!state.started) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startGame();
      }
      return;
    }
    if (event.key === 'e' || event.key === 'E' || event.key === 'Enter') {
      event.preventDefault();
      interact();
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar'].includes(event.key)) {
      event.preventDefault();
    }
    keys.add(event.key);
  }

  function onKeyUp(event) {
    if (state.overlay === 'minigame') {
      if (state.activeGameId === 'spa' && (event.key === ' ' || event.key === 'Spacebar')) {
        minigames.spa.pressHeat(false);
      }
      if (state.activeGameId === 'vodka' && (event.key === ' ' || event.key === 'Spacebar')) {
        minigames.vodka.releasePour();
      }
    }
    keys.delete(event.key);
  }

  function bindUI() {
    dom.startBtn.addEventListener('click', startGame);
    dom.dialogueNext.addEventListener('click', advanceDialogue);
    dom.soundBtn.addEventListener('click', () => {
      const on = sound.toggle();
      updateSoundUI();
      showToast(on ? '声音已开启' : '已经安静下来啦');
    });
    dom.bagBtn.addEventListener('click', openBag);
    dom.bagClose.addEventListener('click', closeBag);
    dom.giftClose.addEventListener('click', closeGift);
    dom.mgExit.addEventListener('click', exitMinigame);
    dom.cakeBtn.addEventListener('click', blowCake);
    dom.replayBtn.addEventListener('click', () => window.location.reload());
    dom.actionBtn.addEventListener('click', interact);
    dom.interactPrompt.addEventListener('click', interact);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', resize);
    window.addEventListener('blur', () => {
      keys.clear();
      resetJoystick();
      if (state.activeGameId === 'spa') minigames.spa.pressHeat(false);
      if (state.activeGameId === 'vodka') minigames.vodka.releasePour();
    });
    setupJoystick();
  }

  function updateSoundUI() {
    const on = sound.isOn();
    dom.soundBtn.classList.toggle('is-on', on);
    dom.soundBtn.setAttribute('aria-pressed', String(on));
    dom.soundBtn.setAttribute('aria-label', on ? '关闭声音' : '开启声音');
  }

  /* =========================================================
     开始 / 主循环
     ========================================================= */
  function startGame() {
    if (state.started) return;
    state.started = true;
    document.body.classList.add('started');
    dom.startScreen.setAttribute('aria-hidden', 'true');
    dom.hud.setAttribute('aria-hidden', 'false');
    const on = sound.enable();
    updateSoundUI();
    if (!on) {
      dom.soundBtn.disabled = true;
      dom.soundBtn.setAttribute('aria-label', '当前浏览器不支持声音');
    }
    updateQuestHint(true);
    setTimeout(() => {
      showDialogue([
        '欢迎来到星愿小镇。四份生日礼物，被藏在小镇的四个角落。',
        '沿着石板路走：西边是追风小径，东边是暖汤小屋；南边还有香草花房和星夜酒吧。',
        '完成每个地方的挑战，礼物就会回到你手里。四份都找齐后，到中央广场找我。'
      ], () => {
        updateQuestHint(true);
      });
    }, 620);
  }

  function init() {
    $('#startName').textContent = CONFIG.herName;
    dom.letterName.textContent = CONFIG.herName;
    dom.letterSign.textContent = CONFIG.yourName;
    document.title = `星愿小镇 · 给${CONFIG.herName}的生日冒险`;
    buildQuestSlots();
    renderBag();
    updateHud();
    bindUI();
    resize();
    updateCamera(true);
    updateActive();
    updateArea();
    updateSoundUI();
    if (!window.AudioContext && !window.webkitAudioContext) {
      dom.soundBtn.disabled = true;
    }
    // 游戏循环
    requestAnimationFrame(function frame(now) {
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      ambientTime += dt;
      updatePlayer(dt);
      updateActive();
      updateArea();
      updateQuestHint();
      drawWorld();
      requestAnimationFrame(frame);
    });

    // 调试接口：只用于预览/验收，不影响正常游玩
    window.__STAR_TOWN__ = {
      state,
      config: CONFIG,
      teleport(x, y) {
        state.player.x = x;
        state.player.y = y;
        updateCamera(true);
      },
      teleportToStation(id) {
        const gift = giftById[id];
        if (gift) {
          state.player.x = gift.x;
          state.player.y = gift.y + 18;
          updateCamera(true);
          updateActive();
        }
      },
      openMinigame,
      completeGift: showGift,
      openFinale
    };
  }

  init();
})();
