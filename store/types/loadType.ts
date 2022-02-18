export interface State {
  isLoading: boolean
}

//gettes向け、getter関数の戻り値を定義
export interface IGetters {
  loading: boolean
}

//mutations向け、mutaion関数のpayloadを定義
export interface IMutations {
  setLoad: boolean
}

//actions向け、action関数のpayloadを定義
export interface IActions {
  start: void //true決め打ち
  end: void //false決め打ち
}
