import {Color} from './Color'

export const StyleDefault = {
  //spinner 
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white
  },   
  //card style
  cardStyle:{
    margin: 10,
    shadowColor: Color.overLay9,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    padding:5,
  },
  cardCover:{
    backgroundColor: Color.white
  },
  // regular styles
  locationStyle:{
    flexDirection:'row',
    alignItems:'center'
  },
}