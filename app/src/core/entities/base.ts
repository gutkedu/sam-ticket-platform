export abstract class Item<Props> {
    protected props: Props;

    abstract get pk(): string;
    abstract get sk(): string;

    public keys() {
        return {
            pk: this.pk,
            sk: this.sk,
        };
    }

    abstract toDynamoItem(): Record<string, unknown>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected constructor(props: any) {
        this.props = props;
    }
}
