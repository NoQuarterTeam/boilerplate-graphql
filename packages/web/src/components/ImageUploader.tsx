import * as React from "react"
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone"
import { Box, Button, Image, useDisclosure } from "@chakra-ui/react"

import { useS3Upload } from "lib/hooks/useS3"
import { useToast } from "lib/hooks/useToast"

import { ButtonGroup } from "./ButtonGroup"
import { Modal } from "./Modal"

interface Props {
  path: string
  onSubmit: (key: string) => Promise<any> | any
  onRemove?: () => Promise<any> | any
  dropzoneOptions?: Omit<DropzoneOptions, "multiple" | "onDrop">
}

export const ImageUploader: React.FC<Props> = ({ children, path, onSubmit, dropzoneOptions }) => {
  const modalProps = useDisclosure()
  const toast = useToast()
  const [image, setImage] = React.useState<{ file: File; preview: string } | null>(null)

  const onDrop = React.useCallback(
    (files: File[], rejectedFiles: FileRejection[]) => {
      window.URL = window.URL || window.webkitURL
      if (rejectedFiles.length > 0) {
        const rejectedFile = rejectedFiles[0]
        if (rejectedFile.errors[0]?.code.includes("file-too-large")) {
          const description = `File too large, must be under ${
            (dropzoneOptions?.maxSize && `${dropzoneOptions.maxSize / 1000000}MB`) || "5MB"
          }`
          toast({ status: "error", title: "Invalid file", description })
        } else {
          // TODO: add remaining error handlers
          toast({ status: "error", description: "Invalid file, please try another" })
        }
        return
      }
      if (files.length === 0) return
      setImage({ file: files[0], preview: window.URL.createObjectURL(files[0]) })
      modalProps.onOpen()
    },
    [toast, modalProps, dropzoneOptions],
  )
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 5000000, // 5MB
    ...dropzoneOptions,
    onDrop,
    multiple: false,
  })
  const [upload, { loading }] = useS3Upload({ path })

  const handleSubmitImage = async () => {
    if (!image || !image.file) return
    try {
      const uploadedFile = await upload(image.file)
      await onSubmit(uploadedFile.fileKey)
      handleClose()
    } catch {
      toast({ status: "error", description: "Error uploading image, please try again." })
    }
  }

  const handleClose = () => {
    modalProps.onClose()
    setImage(null)
  }

  const handleRemoveFile = React.useCallback(() => {
    window.URL = window.URL || window.webkitURL
    if (image) window.URL.revokeObjectURL(image.preview)
  }, [image])

  React.useEffect(() => handleRemoveFile, [handleRemoveFile])

  return (
    <>
      <Box
        cursor="pointer"
        {...getRootProps()}
        position="relative"
        w="max-content"
        _hover={{ opacity: 0.9 }}
        transition="200ms"
      >
        <input {...getInputProps()} />
        {children}
      </Box>
      <Modal {...modalProps} onClose={handleClose} title="Upload new image">
        {image && (
          <Image alt="image preview" objectFit="contain" w="100%" p={12} maxH="400px" src={image.preview} />
        )}
        <ButtonGroup>
          <Button variant="ghost" isDisabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="purple" isLoading={loading} isDisabled={loading} onClick={handleSubmitImage}>
            Submit
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
