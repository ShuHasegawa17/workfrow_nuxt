export interface State {
  isLogin: boolean
}

//gettes向け、getter関数の戻り値を定義
export interface IGetters {
  login: boolean
}

//mutations向け、mutaion関数のpayloadを定義
export interface IMutations {
  setLogin: boolean
}

//actions向け、action関数のpayloadを定義
export interface IActions {
  login: void //true決め打ち
  logout: void //false決め打ち
}
