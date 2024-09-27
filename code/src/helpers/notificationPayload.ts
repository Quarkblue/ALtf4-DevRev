function buildNotificationPayload(
    contentTemplate: string,
    inputs: Record<string, string>,
    receiver: string
  ) {
    return {
      notifications: [
        {
          type: "generic_notification",
          event_type: "assignment",
          metadata: [
            {
              content_template: contentTemplate,
              inputs: inputs,
            },
          ],
          receiver: receiver,
        },
      ],
    };
  }

export default buildNotificationPayload