export default function ToggleButton(props: any) {
    const { item, changeFunc, index } = props;

    const HandleClick = async () => {
        await changeFunc(item);
    };

    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="toggle-switch-checkbox"
                id={"toggle_event" + index}
                checked={item.allow}
                onChange={HandleClick}
            />
            <label
                className="toggle-switch-label"
                tabIndex={-1}
                htmlFor={"toggle_event" + index}
            >
                <span
                    className="toggle-switch-inner"
                    data-yes="Yes"
                    data-no="No"
                    tabIndex={-1}
                />
                <span className="toggle-switch-switch" tabIndex={-1} />
            </label>
        </div>
    );
}
