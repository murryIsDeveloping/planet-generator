import React from "react";

export default function ServiceProvider<T>(service: T) {
  const Context = React.createContext(service);
  return {
    // the provider
    Provider: (props: any) => {
      return (
        <Context.Provider value={service}>
          {props.children}
        </Context.Provider>
      );
    },
    // the HOC store wrapper
    withService: (Component: any, name="service") => (props: any) => {
      return (
        <Context.Consumer>
          {(service) => {
            const serviceProp = {[name]: service}
            return <Component {...serviceProp} {...props}></Component>;
          }}
        </Context.Consumer>
      );
    },
  };
}
