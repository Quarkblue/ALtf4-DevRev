interface Style {
  color: {
    code: string;
    name: string;
  };
}

interface Tag {
  display_id: string;
  id: string;
  id_v1: string;
  name: string;
  style: Style;
  style_new: {
    color: string;
  };
}

interface TagData {
  id: Tag;
  tag: Tag;
}

export { TagData, Tag, Style };
