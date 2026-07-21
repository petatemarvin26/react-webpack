export type Reducer<State, Action> = {
  (state: State, action: Action): State;
};

export type ActionConfig = {
  path?: string;
  query?: any;
};

export type ActionProps<Payload> = {
  payload?: Payload;
} & ActionConfig;

export type Action<Type, Payload = any> = {
  type: Type;
} & ActionProps<Payload>;

export type State<Entity> = {
  data: Entity;
  message?: string;
  loading?: boolean;
  metadata?: {
    page: number;
    size: number;
    total_data: number;
  };
};

export type Dispatch<Type, Payload = any> = {
  (payload?: any, config?: ActionConfig): Action<Type, Payload>;
};

export type Initializer<State> = {
  (payload: State): (state: State) => State;
};
