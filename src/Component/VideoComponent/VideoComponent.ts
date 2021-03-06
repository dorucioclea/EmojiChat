import {MediaComponent} from "../MediaComponent/MediaComponent";
import {prop, selector} from "../Component/Component";
import {IVideoComponent} from "./Interface/IVideoComponent";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";

@selector("video-element")
export class VideoComponent extends MediaComponent implements IVideoComponent {
	public role = "img";
	public placeholderMedia = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTQgOSI+ICA8cGF0aCBmaWxsLW9wYWNpdHk9Ii4xMiIgZD0iTTEwLjcgMy40VjFjMC0uNS0uNC0xLS44LTFIMUMuNiAwIC4zLjUuMyAxdjdjMCAuNC4zLjcuNy43aDljLjMgMCAuNy0uNC43LS44di0zbDMgM1YwbC0zIDIuOHYuNnoiLz48L3N2Zz4=";
	@prop srcObject: MediaStream|null = null;
	@prop playing: boolean = false;

	static get observedAttributes (): string[] {
		return [...super.observedAttributes, "width", "height"];
	}

	public get nativeVideoElement (): HTMLVideoElement {
		return <HTMLVideoElement> this.element("video");
	}

	protected get hasMedia (): boolean {
		return this.hasAttribute("src") || this.srcObject != null;
	}

	protected get currentMedia (): MediaStream|string|null {
		return this.srcObject || this.getAttribute("src");
	}

	public static markup (): string {
		return `
		<img id="placeholderImage"/>
		<video preload="metadata" id="video" webkit-playsinline></video>`;
	}

	public static styles (): string {
		// language=CSS
		return `

        :host {
            backface-visibility: hidden;
            transform: translate3d(0, 0, 0);
            box-sizing: border-box;
            height: 250px;
            position: relative;
            display: block;
            width: 100%;
            max-width: 100%;
            padding: 0;
            overflow: hidden;
            contain: strict;
            border: none;
        }

        :host(:not([loaded])) #video,
        :host([loaded]) #placeholderImage {
            opacity: 0;
            pointer-events: none;
        }

        #video {
            height: inherit;
            width: inherit;
            margin: 0 auto;
        }

        #placeholderImage,
        #video {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            user-select: none;
            backface-visibility: hidden;
            box-sizing: border-box;
            contain: strict;
            transition: opacity var(--duration-entering) ease;
            opacity: 1;
            visibility: visible;
        }

        #placeholderImage {
            margin: auto;
            width: 50%;
        }

        :host([contained]) #placeholderImage,
        :host([contained]) #video {
            object-fit: contain;
        }

        :host([cover]) #placeholderImage,
        :host([cover]) #video {
            object-fit: cover;
        }
		`;
	}

	async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {
		await super.onPropChanged({prop, newValue, oldValue});

		switch (prop) {

			case "srcObject":
				if (this.srcObject == null) this.unload().then();

				else if (this.hasAttribute("autoload")) {
					this.load().then();
				}
				else {
					this.loaded = false;
					this.loading = false;
				}
				break;

			case "playing":
				this.toggleAttribute("playing", this.playing);
		}
	}

	public async play (): Promise<void> {
		await this.load();
		const video = <HTMLVideoElement>this.element("video");
		video.play();
		this.playing = true;
	}

	public async pause (): Promise<void> {
		const video = <HTMLVideoElement>this.element("video");
		video.pause();
		this.playing = false;
	}

	public async stop (): Promise<void> {
		await this.pause();
		const video = <HTMLVideoElement>this.element("video");
		video.currentTime = 0;
		await this.setInitialState();
	}

	public async onPlaceholderTapped (): Promise<void> {
		if (this.loaded || this.loading) return;
		await this.load();
	}

	protected connectedCallback (): void {
		const placeholder = <HTMLImageElement> this.element("placeholderImage");
		placeholder.addEventListener("click", () => this.onPlaceholderTapped());
		placeholder.src = this.placeholderMedia;
	}

	protected async loadMedia (media: string|MediaStream): Promise<void> {
		const video = <HTMLVideoElement>this.element("video");
		if (typeof media === "string") video.src = media;
		else video.srcObject = media;

		video.onloadedmetadata = () => {
			(<any>video).onload = null;
			this.onLoadMediaSuccessAction();
		};
		video.onerror = () => {
			(<any>video).onload = null;
			this.onLoadMediaFailedAction();
		};

	}

	protected async setInitialState (): Promise<void> {
		const video = <HTMLVideoElement> this.element("video");
		video.removeAttribute("src");
		video.srcObject = null;
		this.loaded = false;
	}

	protected async attributeChangedCallback (attrName: string, _: string, newValue: string): Promise<void> {
		await super.attributeChangedCallback(attrName, _, newValue);

		switch (attrName) {

			case "width":
			case "height":
				const video = this.element("video");
				if (newValue == null) {
					if (video.hasAttribute(attrName)) video.removeAttribute(attrName);
				} else {
					video.setAttribute(attrName, newValue);
				}
				break;
		}
	}

	protected onUnloadMediaAction (): void {
		super.onUnloadMediaAction();
		this.srcObject = null;
	}
}