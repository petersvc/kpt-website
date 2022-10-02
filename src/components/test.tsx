function test(): JSX.IntrinsicElements {
  const a = new Array(100)
  a.fill(<h1>oi</h1>)
  console.log(a)
  return <h1>oi</h1>
}

export default test
