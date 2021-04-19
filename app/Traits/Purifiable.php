<?php

namespace App\Traits;

use Mews\Purifier\Facades\Purifier;

trait Purifiable
{
    /**
     * Updates the content and html attribute of the given model.
     *
     * @param string $rawHtml
     *
     * @return \Illuminate\Database\Eloquent\Model $this
     */
    public function setPurifiedContent($rawHtml)
    {

        $this->content = Purifier::clean($rawHtml, ['HTML.Allowed' => '']);
        $this->html = Purifier::clean($rawHtml, 'a:3:{s:15:"HTML.SafeIframe";s:4:"true";s:20:"URI.SafeIframeRegexp";s:72:"%^(http://|https://|//)(www.youtube.com/embed/|player.vimeo.com/video/)%";s:18:"URI.AllowedSchemes";a:5:{s:4:"data";b:1;s:4:"http";b:1;s:5:"https";b:1;s:6:"mailto";b:1;s:3:"ftp";b:1;}}');

        return $this;
    }
}
