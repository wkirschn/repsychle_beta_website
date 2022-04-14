FilePond.registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageEdit
);

FilePond.setOptions({

        imageResizeTargetHeight: 250,
        imageResizeTargetWidth: 250
    }
);


// Select the file input and use
// create() to turn it into a pond
FilePond.parse(document.body);


