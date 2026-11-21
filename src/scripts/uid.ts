/* Page-unique ids for inline SVG masks; the counter runs for the whole build. */
let n = 0;
export const uid = (prefix: string) => `${prefix}-${(n++).toString(36)}`;
