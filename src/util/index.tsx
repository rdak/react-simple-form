// falsy request
export const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

// proper card format
export const formatCard = (s: string) => s.match(new RegExp('.{1,4}', 'g')) ? s.match(new RegExp('.{1,4}', 'g')).join(' ') : s;

// hide symbols
export const hiddenCard = (s: string) => s.replace(/(\d{16})(\d{3})/g, "**** **** **** **** $2");
