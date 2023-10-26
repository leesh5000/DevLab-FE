const validator = {
  id: /^[a-z0-9]{4,20}$/, // 영어, 숫자로 된 4~20자리
  password: /^.{6,30}$/,
  nickname: /^[a-zA-Z0-9가-힣]{2,20}$/, // 한글, 영어, 숫자로 된 2~20자리
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  introduce: /^.{1,150}$/,
}

export default validator
