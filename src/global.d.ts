// vue-shims.d.ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.json' {
  const jsonData: any;
  export default jsonData;
}