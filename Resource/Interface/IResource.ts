export declare type DirectoryGetter = (steps?: number) => string;

export interface ICommonPath {
	directory: DirectoryGetter;
	polyfill: IPolyfillPath;
	favicon: DirectoryGetter;
	lib: ILibPath;
}

export interface IDistPath extends ICommonPath {
	asset: IAssetDistPath;
	bundle: DirectoryGetter;
	indexHtml: DirectoryGetter;
	sharedCss: DirectoryGetter;
	manifest: DirectoryGetter;
}

export interface IImagePath {
	directory: DirectoryGetter;
}

export interface IIconPath {
	directory: DirectoryGetter;
	product: IProductIconsPath;
	standard: IStandardIconsPath;
}

export interface IProductIconsPath {
	directory: DirectoryGetter;
	productIcons: DirectoryGetter;
}

export interface IStandardIconsPath {
	directory: DirectoryGetter;
	ios: DirectoryGetter;
	material: DirectoryGetter;
}

export interface IAssetDistPath {
	directory: DirectoryGetter;
	image: IImagePath;
}

export interface IAssetSrcPath {
	directory: DirectoryGetter;
	image: IImagePath;
	icon: IIconPath;
}

export interface ISrcPath extends ICommonPath {
	asset: IAssetSrcPath;
	entry: DirectoryGetter;
	indexHtmlJS: DirectoryGetter;
	sharedCssJS: DirectoryGetter;
	manifestJS: DirectoryGetter;
}

export interface IAppPath {
	src: ISrcPath;
	dist: IDistPath;
}

export interface IBrowserPath {
	root: () => string;
}

export interface IBrowserResource {
	path: IBrowserPath;
}

export interface IAppResource {
	meta: IAppMeta;
	path: IAppPath;
}

export interface ITrackerModelPath {
	directory: DirectoryGetter;
	model1: DirectoryGetter;
	model2: DirectoryGetter;
	model3: DirectoryGetter;
	model4: DirectoryGetter;
	model5: DirectoryGetter;
	model6: DirectoryGetter;
}

export interface ITrackerPath {
	directory: DirectoryGetter;
	tracker: DirectoryGetter;
	model: ITrackerModelPath;
}

export interface ILibPath {
	directory: DirectoryGetter;
	tracker: ITrackerPath;
}

export interface IPolyfillPath {
	directory: DirectoryGetter;
	webAnimations: DirectoryGetter;
	pointerEvents: DirectoryGetter;
}

export interface IStaticAsset {
	from: DirectoryGetter;
	to: DirectoryGetter;
}

export interface IBuildResource {
	format: string;
	sourceMap: boolean;
	treeshake: boolean;
	staticAssets: IStaticAsset[];
}

export interface IAppMeta {
	title: string;
	shortName: string;
	direction: string;
	language: string;
	display: string;
	orientation: string;
	description: string;
	startUrl: string;
}

export interface IResource {
	browser: IBrowserResource;
	app: IAppResource;
	build: IBuildResource;
}