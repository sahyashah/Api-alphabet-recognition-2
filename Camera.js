import * as React from "react"
import {View,Button,Image,Platform} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

getPermissionsAsync=async()=>{
    if(Platform.OS!=="web"){
      const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(status!=="granted"){
        alert("Permissions need to be granted")
      }
    }

  }

_PickImage=async()=>{
    try{
      let result=await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        this.setState({image:result.data})
        console.log(result.uri)
        this.uploadImage(result.uri)
      }


    }
    catch(E){
      console.log(E)

    }
  }

uploadImage=async(uri)=>{
    const data=new FormData()
    let fileName=uri.split("/")[uri.split("/").length-1]
    let fileType=`image/${uri.split(".")[uri.split(".").length-1]}`
    const filetoUpload={
      uri:uri,
      name:fileName,
      type:fileType
    }
data.append("digit",filetoUpload)
fetch("/predict-digit",{
  method:"POST",
  body:data,
  headers:{
    "content-type":"multipart/form-data"
  }
})

}

