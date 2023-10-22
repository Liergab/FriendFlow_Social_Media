import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  
  } from "@material-tailwind/react";
 import { useState } from "react";
import { ApiGetUser } from "../../hooks/useUserApi";
import FormUpdate from "./FormUpdate";


const Update = () => {
    const {data:currentUser} = ApiGetUser()
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);
  return (
    <>
    <Button onClick={handleOpen} variant="gradient" color="blue">
      Update
    </Button>
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Update {currentUser?.username} data!</DialogHeader>
      <DialogBody>
        <FormUpdate/>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  </>
  )
}

export default Update