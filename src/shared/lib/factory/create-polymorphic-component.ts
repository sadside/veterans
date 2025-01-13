import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type FunctionComponent,
  type JSXElementConstructor,
  type ReactElement,
  type ElementType as ReactElementType,
} from "react";

type ExtendedProps<Props = {}, OverrideProps = {}> = OverrideProps & Omit<Props, keyof OverrideProps>;

type ElementType = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

type PropsOf<C extends ElementType> = JSX.LibraryManagedAttributes<C, ComponentPropsWithoutRef<C>>;

type ComponentProp<C> = {
  component?: C;
};

type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<PropsOf<C>, Props>;

export type PolymorphicRef<C> = C extends ReactElementType ? ComponentPropsWithRef<C>["ref"] : never;

export type PolymorphicComponentProps<C, Props = {}> = C extends ReactElementType
  ? InheritedProps<C, Props & ComponentProp<C>> & {
      ref?: PolymorphicRef<C>;
      renderRoot?: (props: any) => any;
    }
  : Props & { component: ReactElementType; renderRoot?: (props: Record<string, any>) => any };

export function createPolymorphicComponent<ComponentDefaultType, Props, StaticComponents = Record<string, never>>(
  component: any,
) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Props>;

  type _PolymorphicComponent = <C = ComponentDefaultType>(props: ComponentProps<C>) => ReactElement;

  type ComponentProperties = Omit<FunctionComponent<ComponentProps<any>>, never>;

  type PolymorphicComponent = _PolymorphicComponent & ComponentProperties & StaticComponents;

  return component as PolymorphicComponent;
}
