interface Text {
  type: string;
  text: string;
}

interface Accessory {
  type: string;
  image_url: string;
  alt_text: string;
}

interface Block {
  type: string;
  text: Text;
  block_id?: string;
  accessory?: Accessory
}

interface Blocks {
  blocks: Array<Block>
}

export {
  Blocks
}
