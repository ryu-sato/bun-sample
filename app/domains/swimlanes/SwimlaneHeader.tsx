type SwimlaneHeaderProps = {
  orderedTaskStatuses: Array<string>,
}
export function SwimlaneHeader(props: SwimlaneHeaderProps) {
  // [TODO] i18n 化
  const taskStatusesJa: { [key: string]: string } = {
    OPEN: '新規',
    INPROGRESS: '進行中',
    TOVERIFY: '解決',
    FEEDBACK: 'フィードバック',
    DONE: '終了',
    REJECT: '却下',
  };

  return <>
    <div className="col border">ストーリー</div>
    { props.orderedTaskStatuses.map(s => (
      <div className="col border" key={ s }>{ taskStatusesJa[s] }</div>
    )) }
  </>;
}
