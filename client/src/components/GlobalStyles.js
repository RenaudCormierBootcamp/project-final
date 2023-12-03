import { createGlobalStyle } from 'styled-components'; 
import warlocksUrl from '../fonts/warlocksale.ttf' 
import epicUrl from '../fonts/epicslap.otf' 

export default createGlobalStyle` 

  html, body {
    max-width: 100vw;
    min-height: 100%;
    height: 100%;
  }
  
  @font-face {
  font-family: 'warlocks-ale';
  src: url(${warlocksUrl}) format('truetype');
  /* other formats include: 'woff2', 'truetype, 'opentype',
                            'embedded-opentype', and 'svg' */
}

@font-face {
  font-family: 'epicslap';
  src: url(${epicUrl}) format('opentype');
  /* other formats include: 'woff2', 'truetype, 'opentype',
                            'embedded-opentype', and 'svg' */
}

  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, svg, button, input {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    text-decoration: none; 
    font-size:inherit;
    color:inherit;

  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul { 
  }
  blockquote, q { 
  }
  blockquote:before, blockquote:after,
  q:before, q:after { 
  }

  body {  
    background: #f0f0f0;
  }

  .disabled, .disabled:hover {
    cursor: not-allowed;
  }

`;
