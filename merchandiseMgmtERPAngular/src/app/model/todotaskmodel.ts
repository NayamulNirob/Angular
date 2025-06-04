export enum TaskStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    // RUNNING = 'RUNNING',

}

export interface TodoTask {
    id: number;
    description: string;
    status: TaskStatus;
}