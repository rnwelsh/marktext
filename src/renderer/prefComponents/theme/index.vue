/*<!-- @vue-disable no-trailing-spaces, space-before-function-paren, no-multiple-empty-lines -->*/
  

<template>
  <div class="pref-theme">

    <h4>Theme</h4>

    <section class="offcial-themes">
      <div v-for="t of themes" :key="t.name" class="theme"
        :class="[t.name, { 'active': t.name === theme }]"
        @click="onSelectChange('theme', t.name)"
      >
        <div v-html="t.html"></div>
      </div>
    </section>

    <separator/>

    <compound>
      <template #head>
        <h6 class="title">Options</h6>
      </template>

      <template #children>
        <cur-select
          description="Automatically adjust application theme according to system settings"
          :value="autoSwitchTheme"
          :options="autoSwitchThemeOptions"
          :onChange="value => onSelectChange('autoSwitchTheme', value)"
        />
      </template>
    </compound>

    <compound id="cssEditor" class="custom-css">
      <template #head>
        <h6 class="title">Custom CSS</h6>
      </template>

      <template #children>
        <bool
          description="Enable Developer Tools"
          detailedDescription= "Toggle: ctrl+alt+I"
          :bool="devToolsEnabled"
          :onChange="value => onSelectChange('devToolsEnabled', value)"
          more=""
        />

        <cssEditor></cssEditor>
      </template>
    </compound>

    <separator v-show="false"></separator>
    <section v-show="false" class="import-themes ag-underdevelop">
      <div>
        <span>Open the themes folder</span>
        <el-button size="small">Open Folder</el-button>
      </div>

      <div>
        <span>Import custom themes</span>
        <el-button size="small">Import Theme</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import themeMd from './theme.md'
import { autoSwitchThemeOptions, themes } from './config'
import markdownToHtml from '@/util/markdownToHtml'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import Separator from '../common/separator'
import Compound from '../common/compound'
import CssEditor from '../cssEditor'
import { toggleDevtoolsEnabled } from '@/../main/menu/actions/view'

export default {
  components: {
    CurSelect,
    Bool,
    Separator,
    Compound,
    CssEditor
  },
  data () {
    this.autoSwitchThemeOptions = autoSwitchThemeOptions
    return {
      themes: [],
    }
  },
  computed: {
    ...mapState({
      autoSwitchTheme: state => state.preferences.autoSwitchTheme,
      theme: state => state.preferences.theme,
      devtoolsEnabled: state => state.layout.devtoolsEnabled
    })
  },
  created () {
    this.$nextTick(async () => {
      const newThemes = []
      for (const theme of themes) {
        const html = await markdownToHtml(themeMd.replace(/{theme}/, theme.name))
        newThemes.push({
          name: theme.name,
          html
        })
      }

      this.themes = newThemes
    })
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    },
    updateLayoutState (type, value) {
      // this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      toggleDevtoolsEnabled()
    },

  }
}
</script>

<style>
  .offcial-themes {
    margin-top: 12px;
    & .theme {
      cursor: pointer;
      width: 248px;
      height: 100px;
      margin: 0px 20px 10px 20px;
      padding-left: 30px;
      padding-top: 20px;
      overflow: hidden;
      display: inline-block;
      background: var(--editorBgColor);
      color: var(--editorColor);
      box-sizing: border-box;
      box-shadow: 0 9px 28px -9px rgba(0, 0, 0, .4);
      border-radius: 5px;
      &.dark {
        color: rgba(255, 255, 255, .7);
        background: #282828;
        & a {
          color: #409eff;
        }
      }
      &.light {
        color: rgba(0, 0, 0, .7);
        background: rgba(255, 255, 255, 1);
        & a {
          color: rgba(33, 181, 111, 1);;
        }
      }
      &.graphite {
        color: rgba(43, 48, 50, .7);
        background: #f7f7f7;
        & a {
          color: rgb(104, 134, 170);
        }
      }
      &.material-dark {
        color: rgba(171, 178, 191, .8);
        background: #34393f;
        & a {
          color: #f48237;
        }
      }
      &.one-dark {
        color: #9da5b4;
        background: #282c34;
        & a {
          color: rgba(226, 192, 141, 1);
        }
      }
      &.ulysses {
        color: rgba(101, 101, 101, .7);
        background: #f3f3f3;
        & a {
          color: rgb(12, 139, 186);
        }
      }
    }
    & .theme.active {
      box-shadow: var(--floatShadow);
    }
    & h3 {
      margin: 0;
      font-size: 16px;
      color: currentColor;
      cursor: pointer;
      &::before {
        content: 'h3';
        position: absolute;
        top: 4px;
        left: -20px;
        display: block;
        width: 10px;
        height: 10px;
        font-size: 12px;
        opacity: .5;
      }
    }
    & p {
      font-size: 12px;
    }
  }
  .import-themes {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    color: var(--editorColor);
    & > div {
      display: flex;
      flex-direction: column;
      & > span {
        display: inline-block;
        margin-bottom: 20px;
      }
    }
  }
  .custom-css {
  box-sizing: border-box;
  margin-top:8px;
  margin-bottom:8px;
  display:block;
}
.el-tooltip__popper {
  font-family: monospace;
}
</style>
