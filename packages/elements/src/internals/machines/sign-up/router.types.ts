import type { SignUpResource } from '@clerk/types';
import type { ActorRefFrom, SnapshotFrom, StateMachine } from 'xstate';

import type { TFormMachine } from '~/internals/machines/form';
import type {
  BaseRouterContext,
  BaseRouterErrorEvent,
  BaseRouterInput,
  BaseRouterLoadingEvent,
  BaseRouterNextEvent,
  BaseRouterPrevEvent,
  BaseRouterRedirectEvent,
  BaseRouterResetEvent,
  BaseRouterSetClerkEvent,
  BaseRouterStartEvent,
  BaseRouterTransferEvent,
} from '~/internals/machines/types';

// ---------------------------------- Tags ---------------------------------- //

export const SignUpRouterRoutes = {
  start: 'route:start',
  continue: 'route:continue',
  verification: 'route:verification',
  callback: 'route:callback',
  error: 'route:error',
} as const;

export type SignUpRouterRoutes = keyof typeof SignUpRouterRoutes;
export type SignUpRouterTags = (typeof SignUpRouterRoutes)[keyof typeof SignUpRouterRoutes];

// ---------------------------------- Children ---------------------------------- //

export const SignUpRouterSystemId = {
  start: 'start',
  continue: 'continue',
  verification: 'verification',
} as const;

export type SignUpRouterSystemId = keyof typeof SignUpRouterSystemId;

// ---------------------------------- Events ---------------------------------- //

export type SignUpRouterNextEvent = BaseRouterNextEvent<SignUpResource>;
export type SignUpRouterStartEvent = BaseRouterStartEvent;
export type SignUpRouterPrevEvent = BaseRouterPrevEvent;
export type SignUpRouterErrorEvent = BaseRouterErrorEvent;
export type SignUpRouterTransferEvent = BaseRouterTransferEvent;
export type SignUpRouterRedirectEvent = BaseRouterRedirectEvent;
export type SignUpRouterResetEvent = BaseRouterResetEvent;
export type SignUpRouterLoadingEvent = BaseRouterLoadingEvent<'start' | 'verifications' | 'continue'>;
export type SignUpRouterSetClerkEvent = BaseRouterSetClerkEvent;

export interface SignUpRouterInitEvent extends BaseRouterInput {
  type: 'INIT';
  formRef: ActorRefFrom<TFormMachine>;
  signInPath?: string;
}

export type SignUpRouterNavigationEvents = SignUpRouterStartEvent | SignUpRouterPrevEvent;

export type SignUpRouterEvents =
  | SignUpRouterInitEvent
  | SignUpRouterNextEvent
  | SignUpRouterNavigationEvents
  | SignUpRouterErrorEvent
  | SignUpRouterTransferEvent
  | SignUpRouterRedirectEvent
  | SignUpRouterResetEvent
  | SignUpRouterLoadingEvent
  | SignUpRouterSetClerkEvent;

// ---------------------------------- Delays ---------------------------------- //

export const SignUpRouterDelays = {
  polling: 300_000, // 5 minutes
} as const;

export type SignUpRouterDelays = keyof typeof SignUpRouterDelays;

// ---------------------------------- Context ---------------------------------- //

export type SignUpRouterLoadingContext = Omit<SignUpRouterLoadingEvent, 'type'>;

export interface SignUpRouterContext extends BaseRouterContext {
  formRef: ActorRefFrom<TFormMachine>;
  loading: SignUpRouterLoadingContext;
  signInPath: string;
}

// ---------------------------------- Schema ---------------------------------- //

export interface SignUpRouterSchema {
  context: SignUpRouterContext;
  events: SignUpRouterEvents;
  tags: SignUpRouterTags;
  delays: SignUpRouterDelays;
}

// ---------------------------------- Machine Type ---------------------------------- //

export type SignUpRouterChildren = any; // TODO: Update
export type SignUpRouterOuptut = any; // TODO: Update
export type SignUpRouterStateValue = any; // TODO: Update

export type TSignUpRouterParentMachine = StateMachine<
  SignUpRouterContext, // context
  SignUpRouterEvents, // event
  SignUpRouterChildren, // children
  any, // actor
  any, // action
  any, // guard
  any, // delay
  SignUpRouterStateValue, // state value
  string, // tag
  any, // input
  SignUpRouterOuptut, // output
  any, // emitted
  any // meta - Introduced in XState 5.12.x
>;

// ---------------------------------- Machine Actor Ref ---------------------------------- //

export type SignInRouterMachineActorRef = ActorRefFrom<TSignUpRouterParentMachine>;

// ---------------------------------- Snapshot ---------------------------------- //

export type SignUpRouterSnapshot = SnapshotFrom<TSignUpRouterParentMachine>;
