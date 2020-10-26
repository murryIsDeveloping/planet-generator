import React from "react";

type Service<T> = {
  name: string;
  store: T,
  Context: React.Context<T>;
}
export function Service<T>(store: T, name: string) : Service<T> {
  const Context = React.createContext(store);
  return {
    store,
    Context,
    name
  }
}


export function withServices(Component: any, services: Service<any>[]) {
  return services.reduce((Comp, service: Service<any>) => {
    const Consumer = service.Context.Consumer
    return (props: any) => (
      <Consumer>
          {(data) => {
            const serviceProp = {[service.name]: data}
            return <Comp {...serviceProp} {...props}></Comp>;
          }}
      </Consumer>
    )
  }, (props: any) => (<Component {...props}></Component>)) 
}

export function servicesProviders(...services: Service<any>[]) {
  return (props: any) => services.reduce((acc, service) => {
    const Provider = service.Context.Provider
    return (
      <Provider value={service.store}>
        {acc}
      </Provider>
    )
  }, props.children) 
}