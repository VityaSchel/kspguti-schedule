#!/usr/bin/env zsh

# Read each line from urls.txt
while IFS= read -r url; do
  # Extract file name from URL
  filename=$(basename $url)

  # Download the content to a temporary file
  temp_file=$(mktemp)
  curl -s -o $temp_file $url

  # Check if download was successful
  if [[ $? -eq 0 ]]; then
    # Use 'file --mime-type' to determine the mime type of the file
    content_type=$(file --mime-type -b $temp_file)

    # Check if the content type starts with 'image'
    if [[ $content_type == image/* ]]; then
      echo "$filename downloaded successfully."
      mv $temp_file $filename
    else
      echo "Skipping $filename (Content type is not image)."
      rm -f $temp_file
    fi
  else
    echo "Failed to download $filename."
  fi
done < urls.txt
