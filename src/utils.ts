import { config } from './config';

enum BlockTypes {
  Section = 'section',
  Image = 'image',
  Markdown = 'mrkdwn'
}

const createAccessory = (gifUrl, altText) => ({
  type: BlockTypes.Image,
  image_url: gifUrl,
  alt_text: altText
})

const createHeaderText = (sender, receiver) => ({
  type: BlockTypes.Markdown,
  text: `:heart: <@${sender}> is grateful for ${receiver}!`
})

const createBodyText = (message) => ({
  type: BlockTypes.Markdown,
  text: `>_${message}_`
})

// Block Kit: https://api.slack.com/block-kit
export const formatBlock = (sender: string, receiver: string, message: string) => ([
  {
    type: BlockTypes.Section,
    text: createHeaderText(sender, receiver)
  },
  {
    type: BlockTypes.Section,
    block_id: 'section1',
    text: createBodyText(message),
    accessory: createAccessory(config.messageSettings.gifUrl, config.messageSettings.altText)
  }
])
