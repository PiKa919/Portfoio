declare module 'animejs' {
  export interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    tick(time: number): void;
    began: boolean;
    paused: boolean;
    completed: boolean;
    finished: Promise<void>;
    autoplay: boolean;
    currentTime: number;
    delay: number;
    duration: number;
    loop: number | boolean;
    loopBegan: boolean;
    loopComplete: boolean;
    progress: number;
    remaining: number;
    reversed: boolean;
    animations: AnimeAnimationInstance[];
    animatables: AnimeAnimatable[];
  }

  export interface AnimeAnimationInstance {
    id: string;
    animatable: AnimeAnimatable;
    property: string;
    currentValue: string | number;
    targetValue: string | number;
    type: string;
  }

  export interface AnimeAnimatable {
    id: number;
    target: Element | object;
    transforms: object;
  }

  export interface AnimeParams {
    targets?: string | object | Element | Element[] | NodeList | null;
    duration?: number;
    delay?: number | ((el: Element, i: number, l: number) => number);
    endDelay?: number;
    elasticity?: number;
    round?: number | boolean;
    keyframes?: object[];
    easing?: string | ((t: number) => number);
    direction?: 'normal' | 'reverse' | 'alternate';
    loop?: number | boolean;
    autoplay?: boolean;
    begin?: (anim: AnimeInstance) => void;
    update?: (anim: AnimeInstance) => void;
    complete?: (anim: AnimeInstance) => void;
    loopBegin?: (anim: AnimeInstance) => void;
    loopComplete?: (anim: AnimeInstance) => void;
    changeBegin?: (anim: AnimeInstance) => void;
    change?: (anim: AnimeInstance) => void;
    changeComplete?: (anim: AnimeInstance) => void;
    [property: string]: unknown;
  }

  export interface AnimeStaggerOptions {
    start?: number | string;
    from?: number | string | 'first' | 'last' | 'center';
    direction?: 'normal' | 'reverse';
    easing?: string | ((t: number) => number);
    grid?: [number, number];
    axis?: 'x' | 'y';
  }

  export interface AnimeTimelineInstance extends AnimeInstance {
    add(params: AnimeParams, offset?: string | number): AnimeTimelineInstance;
  }

  // Stagger function type
  type StaggerFunction = (
    value: number | string | [number, number],
    options?: AnimeStaggerOptions
  ) => (el: Element, i: number, l: number) => number;

  // SetDashoffset function type
  type SetDashoffsetFunction = (el: Element) => number;

  // Interface for the anime function with its static methods
  interface AnimeFunction {
    (params: AnimeParams): AnimeInstance;
    stagger: StaggerFunction;
    setDashoffset: SetDashoffsetFunction;
    timeline: (params?: AnimeParams) => AnimeTimelineInstance;
    random: (min: number, max: number) => number;
    set: (targets: string | object | Element | Element[] | NodeList | null, values: { [property: string]: unknown }) => void;
    get: (targets: Element | object, property: string, unit?: string) => string | number;
    path: (path: string | Element | null, percent?: number) => (property: string) => { el: Element; property: string; totalLength: number };
    bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => number;
    running: AnimeInstance[];
    version: string;
    speed: number;
  }

  const anime: AnimeFunction;
  export default anime;
}
