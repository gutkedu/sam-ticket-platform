export abstract class Item<Props> {
    private _pk: string;
    private _sk: string;
    protected props: Props;

    get pk() {
        return this._pk;
    }

    get sk() {
        return this._sk;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected constructor(props: any, pk: string, sk: string) {
        this.props = props;
        this._pk = pk;
        this._sk = sk;
    }
}
