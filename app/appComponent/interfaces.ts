export interface task {
	_id: string,
	severity: number | string,
	text: string,
	completed: boolean,
    editing?: boolean,
	[key: string]: any
}