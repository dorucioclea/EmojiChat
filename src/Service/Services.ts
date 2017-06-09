import {IAnimationOperations} from "./AnimationOperations/Interface/IAnimationOperations";
import {AnimationOperations} from "./AnimationOperations/AnimationOperations";
import {EventUtil, IEventUtil} from "@wessberg/eventutil";
import {IWaitOperations} from "../../Common/Service/WaitOperations/Interface/IWaitOperations";
import {WaitOperations} from "../../Common/Service/WaitOperations/WaitOperations";
import {ISvgIconUtil} from "./SvgIconUtil/Interface/ISvgIconUtil";
import {SvgIconUtil} from "./SvgIconUtil/SvgIconUtil";
import {IAgentDetector} from "./AgentDetector/Interface/IAgentDetector";
import {AgentDetector} from "./AgentDetector/AgentDetector";
import {IGlobalEventBlocker} from "../EventHandler/GlobalEventBlocker/Interface/IGlobalEventBlocker";
import {GlobalEventBlocker} from "../EventHandler/GlobalEventBlocker";
import {INavigationUtil} from "./NavigationUtil/Interface/INavigationUtil";
import {NavigationUtil} from "./NavigationUtil/NavigationUtil";
import {Routes} from "../Router/Routes";
import {IMediaDeviceUtil} from "./MediaDeviceUtil/Interface/IMediaDeviceUtil";
import {MediaDeviceUtil} from "./MediaDeviceUtil/MediaDeviceUtil";
import {IMediaStreamStore} from "../Store/MediaStreamStore/Interface/IMediaStreamStore";
import {MediaStreamStore} from "../Store/MediaStreamStore/MediaStreamStore";

export const globalEventBlocker: IGlobalEventBlocker = new GlobalEventBlocker();
export const agentDetector: IAgentDetector = new AgentDetector();
export const eventUtil: IEventUtil = new EventUtil();
export const svgIconUtil: ISvgIconUtil = new SvgIconUtil();
export const waitOperations: IWaitOperations = new WaitOperations();
export const animationOperations: IAnimationOperations = new AnimationOperations();
export const navigationUtil: INavigationUtil = new NavigationUtil(Routes);
export const mediaDeviceUtil: IMediaDeviceUtil = new MediaDeviceUtil();
export const mediaStreamStore: IMediaStreamStore = new MediaStreamStore();