import { parse } from 'css';

export class CSSParser {
  parse(css: string) {
    console.log(parse(css));
  }
}
