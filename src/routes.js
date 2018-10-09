import Detail from './components/Detail'
import Maincon from './components/Maincon'
import Welcome from './components/Welcome'

export default [
	{
		path:'/main',
		component:Maincon
	},
	{
		path:'/detail',
		component:Detail
	},
	{
		path:'/welcome',
		component:Welcome
	},
	{
		path:'*',
		redirect:'/main'
	}
]

