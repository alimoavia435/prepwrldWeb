import random from 'lodash/random'


export const nodes = [process.env.REACT_APP_NODE1, process.env.REACT_APP_NODE2, process.env.REACT_APP_NODE3]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  console.log(randomIndex, 'random index')
  return nodes[randomIndex]
}

export default getNodeUrl
