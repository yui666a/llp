const IPA = {
  fe: '基本情報技術者試験',
  ap: '応用情報技術者試験',
  sa: 'システムアーキテクト試験',
  nw: 'ネットワークスペシャリスト試験',
  db: 'データベーススペシャリスト試験',
  pm: 'プロジェクトマネージャ試験'
}
const GAS_API ="https://script.google.com/macros/s/AKfycbxPUw73VyxjmzRw96UVsIpuPUlDvI9qFYF4MzpwOecly-KTiQrBv9jwu0sUVZ49b09N/exec"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (context, inject) => {
  inject('IPA', IPA)
  inject('GAS_API', GAS_API)
}
