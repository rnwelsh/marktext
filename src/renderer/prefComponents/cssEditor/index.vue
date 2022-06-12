/*/* eslint-disable no-unused-vars, no-trailing-spaces, space-before-function-paren, no-multiple-empty-lines, quotes, indent */*/
<template>
    <textarea id="codemirror" v-model="content" spellcheck="false" autocomplete="false" 
      
    ></textarea>
</template>

<script>
import { mapState } from 'vuex'
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/css/css.js'
import 'codemirror/addon/edit/closebrackets.js'

export default {
  data () {
    return {
      content: this.$store.state.preferences.customCss,
      editor: null,
      options: {
        mode: "css",
        // extraKeys: { Ctrl: "autocomplete" },
        lineNumbers: true,
        matchBrackets: true,
        theme: this.$store.state.preferences.theme,
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: false,
        smartIndent: true,
        cursorHeight: 0.85,
        styleActiveLine: true,
        spellCheck: false,
        autoCorrect: false,
        autoCloseBrackets: true,
      }
    }
  },
  
  computed: {
    ...mapState({
      customCss: state => state.preferences.customCss
    }),
  },
  
  methods: {
    selectAll () {
      CodeMirror.commands.selectAll(this.editor)
    },
    updateState (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    },
    updateMode () {
      // Modify the syntax configuration of the editor
      this.editor.setOption('mode', 'css')
    },
  },
  
  mounted () {
    this.editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), this.options)
    const update = (val) => this.updateState("customCss", val)
    this.editor.on("blur", (cm) => update(cm.getValue()))
  }
}
</script>

<style>
  #cssEditor .pref-compound-body {
    padding: 6px;
  }
  #cssEditor div.CodeMirror {
    transition: border-color, background-color;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    background-color: hsl(210 6% 7% / 0.075);
    border-radius: 8px;
    border-color: hsl(0 0% 100% / 0.03);
    border-style: solid;
    border-width: 1px;
  }
  #cssEditor div.CodeMirror:hover {
    border-color: hsl(0 0% 100% / 0.07);
  }
  #cssEditor div.CodeMirror:focus-within {
    border-color: hsl(0 0% 100% / 0.15);
  }
  .CodeMirror-activeline-background {
    opacity: 1;
    animation: fadeIn 100ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  }
  #cssEditor div.CodeMirror-gutters {
    background-color: hsl(210 6% 7% / 0.15);
  }
  #cssEditor .CodeMirror-line {
    padding-left: 6px;
  }
  #cssEditor .cm-error {
    background-color: transparent;
    border-bottom-color: hsl(355 69% 42% / 0.7);
    border-bottom-width: 2px;
    border-bottom-style:dotted;
  }

</style>
